import {check, request} from 'react-native-permissions';
export default function requestPermission(REQUESTED, callback) {
    check(REQUESTED)
    .then((result) => {
        console.log('PERMISSIONS result', result);
        if(result == 'granted'){
            return callback(true)
        }else{
            request(REQUESTED).then((result) => {
                console.log('result requested', result);
                return callback(true)
            }); 
        }
    })
    .catch((error) => {
        console.log('PERMISSIONS error', error);  
        return callback(false)
    });
}