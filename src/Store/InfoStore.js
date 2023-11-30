import {action, makeObservable, observable} from 'mobx';

class InfoStore {
  constructor() {
    makeObservable(this);
  }

  @observable login = false;
  @observable activeType = 1;
  @observable cookie = '';

  @action
  setLogin(bool) {
    this.login = bool;
  }

  @action
  setCookie(cookie) {
    this.cookie = cookie;
  }

  @action
  setActiveType(type) {
    this.activeType = type;
  }
}

export default new InfoStore();
