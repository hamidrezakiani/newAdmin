import React , {Component} from 'react'
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

class EditProduct extends Component {
  
  state = {
    id:this.props.product.id,
    name:this.props.product.name,
    label:this.props.product.label,
    turkish_name:this.props.product.turkish_name,
    turkish_label:this.props.product.turkish_label,
    viewable:this.props.product.viewable,
  }
  
  componentDidUpdate(prevProps,prevState){
   if(this.props.product !== prevProps.product)
     this.setState({
       id:this.props.product.id,
       name:this.props.product.name,
       label:this.props.product.label,
       turkish_name:this.props.product.turkish_name,
       turkish_label:this.props.product.turkish_label,
       viewable:this.props.product.viewable,
     })
   return true;
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
  
  updateProduct = () => {
    pleasWait(true)
    axios.put(`products/${this.state.id}`,{
      'name':this.state.name,
      'label':this.state.label,
      'turkish_name':this.state.turkish_name,
      'turkish_label':this.state.turkish_label,
      'viewable':this.state.viewable,
    })
    .then((response) => {
      this.props.close()
      pleasWait(false)
      toastMessages('محصول با موفقیت ویرایش شد','success')
      this.props.setProducts(response.data.data)
      this.props.close()
    })
    .catch((response) => {
      toastMessages('خطا در عملیات ویرایش','danger')
      pleasWait(false)
    })
  }
  render(){
    return <CModal visible="true"
              alignment="center"
      >
        <CModalHeader closeButton={false}>
          <CModalTitle style={{float:'left'}}>ویرایش محصول</CModalTitle>
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
          <CButton color="primary" onClick={() => this.updateProduct()}>ذخیره تغییرات</CButton>
        </CModalFooter>
      </CModal>
  }
}

EditProduct.propTypes = {
  product: PropTypes.array,
  close: PropTypes.func,
  setProducts: PropTypes.func,
}

export default EditProduct