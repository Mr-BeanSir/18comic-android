import {action, makeObservable, observable} from 'mobx';

class InfoStore {
  constructor() {
    makeObservable(this);
  }

  @observable login = false;
  @observable activeType = 1;

  @action
  setLogin(bool) {
    this.login = bool;
  }

  @action
  setActiveType(type) {
    this.activeType = type;
  }
}

export default new InfoStore();
