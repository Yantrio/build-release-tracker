import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewBuildModal from '#c/NewBuildModal'
import ViewBuildModal from '#c/ViewBuildModal'

const Modals = {
  'NEW_BUILD_MODAL': NewBuildModal,
  'VIEW_BUILD_MODAL': ViewBuildModal,
  /* other modals */
}

export default class ModalRoot extends Component {
  render() {
    if(!this.props.modalType) {
      return null;
    }
    var SpecificModal = Modals[this.props.modalType]
    return <SpecificModal {...this.props.modalProps} />
  }
}
export default connect(state => state.modal)(ModalRoot)