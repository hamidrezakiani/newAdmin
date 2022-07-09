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

class AddProduct extends Component {
  
  state = {
    category_id:this.props.category.id,
    name:'',
    label:'',
    turkish_name:'',
    turkish_label:'',
    viewable:'NO',
  }
  
  dataHandler = (event,type) => {
    switch (type) {
      case 'name':
        this.setState({name:event.target.value})
        break;
      case 'label':
        this.setState({label:event.target.value})
        break;
      case 'turkish_name':
        this.setState({turkish_name:event.target.value})
        break;
      case 'turkish_label':
        this.setState({turkish_label:event.target.value})
        break;
      case 'viewable':
        this.setState({viewable:this.state.viewable=='YES'?'NO':'YES'})
        break;  
      default:
        // code
    }
  }
  
  addProduct = () => {
    pleasWait(true)
    axios.post(`products`,{
      'category_id':this.state.category_id,
      'name':this.state.name,
      'label':this.state.label,
      'turkish_name':this.state.turkish_name,
      'turkish_label':this.state.turkish_label,
      'viewable':this.state.viewable,
    })
    .then((response) => {
      this.props.close()
      this.props.openTree()
      pleasWait(false)
      toastMessages('محصول با موفقیت اضافه شد','success')
      this.props.setProducts(response.data.data)
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
          <CModalTitle style={{float:'left'}}>افزودن محصول</CModalTitle>
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
                        value={this.state.label}
                        onChange={(event) => this.dataHandler(event,'label')}/>
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
                        value={this.state.turkish_label}
                        onChange={(event) => this.dataHandler(event,'turkish_label')}/>
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
          <CButton color="success" onClick={() => this.addProduct()}>ثبت</CButton>
        </CModalFooter>
      </CModal>
  }
}

AddProduct.propTypes = {
  category: PropTypes.array,
  openTree: PropTypes.func,
  close: PropTypes.func,
  setProducts: PropTypes.func,
}

export default AddProduct