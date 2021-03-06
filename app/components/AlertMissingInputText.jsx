// -------------------------------------------
// The CLARIN Language Resource Switchboard
// 2016-18 Claus Zinn, University of Tuebingen
// 
// File: AlertMissingInfoText.jsx
// Time-stamp: <2018-10-04 11:49:56 (zinn)>
// -------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class AlertMissingInfoText extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

    constructor(props) {
	super(props);
	this.propagateFun = this.props.onCloseProp;
    }
    
  state = {
    showModal: true
  }
  openModal = () => {
    this.setState({showModal: true});
  }
  closeModal = () => {
      this.setState({showModal: false});
      this.propagateFun();
  }
  render() {
    return <a className={this.props.className} onClick={this.openModal}>
      {this.state.showModal ?
        <AlertMissingInfoTextText onClose={this.closeModal}/>
      : null}
    </a>;
  }
}

class AlertMissingInfoTextText extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
  }
  render() {
    return <ModalContainer onClose={this.props.onClose}>
        <ModalDialog onClose={this.props.onClose} className="systemAlertDialog"  width={400}>
	    <h2>No Textual Input</h2>
	    <p>
	  Please enter some input text, before pressing "Submit Text".
	    </p>
        </ModalDialog>
    </ModalContainer>;
  }
}

