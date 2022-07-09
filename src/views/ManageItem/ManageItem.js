import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Participations from './Participations/Participations'
import Periods from './Periods/Periods'
import{
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'

class ManageItem extends Component {
  
  componentDidMount = () => {
    
  }
  
  componentWillUnmount = () => {
    
  }
  render(){
    return <CModal fullscreen visible={this.props.show} onClose={() => this.props.close()}>
      <CModalHeader>
        <CModalTitle>مدیریت آیتم</CModalTitle>
      </CModalHeader>
      <CModalBody>
       <Participations item_id={this.props.item_id} product_id={this.props.product_id} />
       <Periods item_id={this.props.item_id} />
      </CModalBody>
    </CModal>
  }
}

ManageItem.propTypes = {
  item_id: PropTypes.number,
  product_id: PropTypes.number,
  close: PropTypes.func,
  show: PropTypes.bool,
}

export default ManageItem