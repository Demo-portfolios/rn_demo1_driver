import { all } from "redux-saga/effects";
import {appSaga} from "../Modules/app";
import {homeSaga} from "../Modules/home"
import {userSaga} from "../Modules/user/"

const sagas = [
  appSaga(),
  homeSaga(),
  userSaga(),
];

export default function*() {
  yield all(sagas);
}
