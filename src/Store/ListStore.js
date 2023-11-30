import {action, makeObservable, observable} from 'mobx';

class ListStore {
  constructor() {
    makeObservable(this);
  }

  @observable LastListData = [];

  @action
  setLastListData(data) {
    this.LastListData = data;
  }
}

export default new ListStore();
