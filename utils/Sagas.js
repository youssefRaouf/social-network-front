import createSagaMiddleware from 'redux-saga';

export default class Sagas {
  //Gets the saga middleware
  static __middleWare = null;
  static middleWare() {
    if (!Sagas.__middleWare) {
      Sagas.__middleWare = createSagaMiddleware();
    }

    return Sagas.__middleWare;
  }
}
