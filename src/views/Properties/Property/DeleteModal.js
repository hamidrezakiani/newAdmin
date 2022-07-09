import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon/Icon'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react'
import {
  warning
} from '../../../components/Icon/IconReference'

class DeleteModal extends Component{
  render(){
    return <CModal backdrop={true} alignment="center" visible={true} color="danger">
      <CModalHeader className="bg-danger">
        <CModalTitle></CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Icon
          icon={warning} 
          width="50"
          height="50"
        />
        <strong>
        آیا میخوایید این ویژگی را حذف کنید ؟
        </strong>
      </CModalBody>
      <CModalFooter className="bg-light">
        <CButton color="secondary" onClick={() => this.props.close()}>
          خیر
        </CButton>
        <CButton color="primary" onClick={() => this.props.action()}>بله</CButton>
      </CModalFooter>
    </CModal>
  }
}

DeleteModal.propTypes = {
  action: PropTypes.func,
  close: PropTypes.func,
}

export default DeleteModal