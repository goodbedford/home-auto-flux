import appDispatcher from '../app/appDispatcher';
import Store from '../app/store';

import actionTypes from '../constants/actionTypes';
import httpHelper from '../utils/httpHelper';
import serverActions from '../actions/serverActions';

let _currentHome;
let _isLoading = false;
let _homes = [];
let _hasCompletedInitialLoad = false;

class HomeStore extends Store {
  getState() {
    return {
      isLoading: _isLoading,
      homes: this.fetchHomes()
    };
  }

  fetchHomes () {
    if (!_hasCompletedInitialLoad && !_isLoading) {
      _isLoading = true;
      _hasCompletedInitialLoad = false;
      this.emitChange();
      serverActions.fetchHomes();
    }
    return _homes;
  }
  onReceiveHomes (homes) {
    _isLoading = false;
    _homes = homes;
    this.emitChange();
  }
}
const homeStore = new HomeStore();

homeStore.dispatchToken = appDispatcher.register(action => {
  switch (action.type) {
    case actionTypes.WELCOME:
      console.log('welcom screen');
      break;
    case actionTypes.RECEIVE_HOMES:
      homeStore.onReceiveHomes(action.homes);
      break;
  }
});

export default homeStore;
