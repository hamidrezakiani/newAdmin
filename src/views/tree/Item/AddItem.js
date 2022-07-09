import React, {Component} from 'react'
import axios from '../../../axios/AxiosApi'
import store from '../../../store'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSwitch,
} from '@coreui/react'

const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages

class AddItem extends Component {
  
  state = {
    product_id:this.props.product.id,
    name:'',
    alias:'',
    turkish_name:'',
    turkish_alias:'',
    viewable:'NO',
  }
  
  dataHandler = (event,type) => {
    switch (type) {
      case 'name':
        this.setState({name:event.target.value})
        break;
      case 'alias':
        this.setState({alias:event.target.value})
        break;
      case 'turkish_name':
        this.setState({turkish_name:event.target.value})
        break;
      case 'turkish_alias':
        this.setState({turkish_alias:event.target.value})
        break;
      case 'viewable':
        this.setState({viewable:this.state.viewable=='YES'?'NO':'YES'})
        break;  
      default:
        // code
    }
  }
  
  addItems = () => {
    pleasWait(true)
    axios.post(`items`,{
      'product_id':this.state.product_id,
      'name':this.state.name,
      'alias':this.state.alias,
      'turkish_name':this.state.turkish_name,
      'turkish_alias':this.state.turkish_alias,
      'viewable':this.state.viewable,
    })
    .then((response) => {
      this.props.close()
      this.props.openTree()
      pleasWait(false)
      toastMessages('آیتم با موفقیت اضافه شد','success')
      this.props.setItems(response.data.data)
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در عملیات','danger')
    })
  }
  render(){
    return <CModal visible="true"
              alignment="center"
      >
        <CModalHeader closeButton={false}>
          <CModalTitle style={{float:'left'}}>افزودن آیتم</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.state.name}
                        onChange={(event) => this.dataHandler(event,'name')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام نمایشی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.state.alias}
                        onChange={(event) => this.dataHandler(event,'alias')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.state.turkish_name}
                        onChange={(event) => this.dataHandler(event,'turkish_name')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام نمایشی ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.state.turkish_alias}
                        onChange={(event) => this.dataHandler(event,'turkish_alias')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CFormSwitch label="نمایش/مخفی" 
            checked={this.state.viewable=='YES'?true:false}
            onChange={(event) => this.dataHandler(event,'viewable')}/>
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => this.props.close()}>
            بستن
          </CButton>
          <CButton color="success" onClick={() => this.addItems()}>ثبت</CButton>
        </CModalFooter>
      </CModal>
  }
}

AddItem.propTypes = {
  product: PropTypes.array,
  close: PropTypes.func,
  openTree: PropTypes.func,
  setItems: PropTypes.func,
}

export default AddItem