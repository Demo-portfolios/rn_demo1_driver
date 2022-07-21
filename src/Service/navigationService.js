import { NavigationActions, StackActions } from "react-navigation";
let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );

}

function reset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  );
}

function setParam(routeName, params) {
  this.props.navigation.dispatch(
    NavigationActions.setParams({
      params,
      key: routeName
    })
  );
}

function goBack() {
  navigator.dispatch(
    NavigationActions.back()
  );
}

export default {
  navigate,
  setParam,
  setTopLevelNavigator,
  reset,
  goBack
};
