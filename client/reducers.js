import { combineReducers } from 'redux';
import { BUILD_LOAD_START, SET_BUILDS, SHOW_NEW_BUILD_MODAL, SHOW_VIEW_BUILD_MODAL, HIDE_MODAL } from './actions';

const initalModalState = {
  visible: false,
  modalType: null,
  modalProps: {}
}
function builds(state = {}, action) {
  switch(action.type) {
    case SET_BUILDS:
      return Object.assign({}, state, {fetching: false, builds : action.builds});
    case BUILD_LOAD_START:
      return Object.assign({}, state, {fetching : true});
    default:
      return state;
  }
}

function modal(state = {}, action) {
  switch(action.type) {
    case SHOW_VIEW_BUILD_MODAL:
      return {
        visible: true,
        modalType: 'VIEW_BUILD_MODAL',
        modalProps: {
          build: action.build
        }
      };
    case SHOW_NEW_BUILD_MODAL:
      return {
        visible: true,
        modalType: 'NEW_BUILD_MODAL',
        modalProps: {}
      };
    case HIDE_MODAL:
      return initalModalState;
    default:
      return state;
  }
}

export default combineReducers({modal, builds});
