export const BUILD_LOAD_START = 'BUILD_LOAD_START';
export const SET_BUILDS = 'SET_BUILDS';
export const REMOVE_BUILD = 'REMOVE_BUILD';
export const SAVE_NEW_BUILD = 'SAVE_NEW_BUILD';
export const SHOW_NEW_BUILD_MODAL = 'SHOW_NEW_BUILD_MODAL';
export const SHOW_VIEW_BUILD_MODAL = 'SHOW_VIEW_BUILD_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

/**
 * action creators
 */

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

export function showNewBuildModal() {
  return {
    type: SHOW_NEW_BUILD_MODAL
  };
}

export function showViewBuildModal(build){
  return {
    type: SHOW_VIEW_BUILD_MODAL,
    build
  };
}

export function saveNewBuild(build) {
  return (dispatch) => {
    fetch(`/api/v1/builds`, {
      method : 'post',
      body: JSON.stringify(build)
    })
    .then(function(r) {
      return r.json();
    }).then(function(resp) {
      loadBuilds()(dispatch);
    });
  }
}

export function setBuilds(builds) {
  return {
    type: SET_BUILDS,
    builds
  };
}

export function loadBuilds() {
  return (dispatch) => {
    dispatch({
      type: BUILD_LOAD_START
    });

    fetch('/api/v1/builds').then((r) => {
      return r.json();
    }).then((builds) => {
      dispatch(setBuilds(builds));
    });
  }
}

export function removeBuild(build) {
  return (dispatch) => {
    fetch(`/api/v1/builds/${build.ID}`, {method : 'delete'})
    .then(function(r) {
      return r.json();
    }).then(function(resp) {
      loadBuilds()(dispatch);
    });
  }
}