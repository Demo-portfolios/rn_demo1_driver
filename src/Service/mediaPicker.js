import ImagePicker from "react-native-image-crop-picker"
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";
import { API_URL } from "../Modules/app/config";
import axiosDefault from "axios";
var baseURL = API_URL;
export const axios = axiosDefault.create({
  baseURL,
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
});
const options = {
  width: 320,
  height: 320,
  cropping: true,
  includeBase64:true,
  forceJpg:true,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
const selectPhoto = onSelect => {
  ImagePicker.openPicker(options).then((response) => {
    console.log();
    if (response.didCancel) {
      //   console.log("User cancelled image picker");
    } else if (response.error) {
      //   console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      //   console.log("User tapped custom button: ", response.customButton);
    } else {
      response.path = response.path.replace("file://", "");
      if (!response.filename) {
        response.filename = response.path.split("/").pop();
      }
      if (onSelect) {
        onSelect(response);
      }
    }
  });
}

const openCamera = onSelect => {
  ImagePicker.openCamera(options).then(response => {
    if (response.didCancel) {
      //   console.log("User cancelled image picker");
    } else if (response.error) {
      //   console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      //   console.log("User tapped custom button: ", response.customButton);
    } else {
      response.path = response.path.replace("file://", "");
      if (!response.filename) {
        response.filename = response.path.split("/").pop();
      }
      if (onSelect) {
        onSelect(response);
      }
    }
  });
};

const uploadPhoto = async (file, profilePhotoFileNameOldImage) => {
  var authDataString = await AsyncStorage.getItem("@DataLogin");
  const authData = JSON.parse(authDataString);
  try{
    const body = [{
      name: "profilePhoto",
      filename: file.filename,
      type: `${file.mime}`,
      data: RNFetchBlob.wrap(file.path)
    }];
    if(profilePhotoFileNameOldImage && profilePhotoFileNameOldImage !== null){
      body.push(
        {
          name:'profilePhotoFileNameOldImage', 
          data: profilePhotoFileNameOldImage
        }
      )
    }
    console.log('body', body);
    return new Promise((resolve, reject) =>
      RNFetchBlob.fetch(
        "POST",
        `${API_URL}app/user/profile`,
        {
          Authorization: `Bearer ${authData.token}`,
          enctype: "multipart/form-data"
        },
        body
      )
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        })
    );
  }catch(error){
    return ('error', error);
  }
};

export default { selectPhoto, uploadPhoto, openCamera};
