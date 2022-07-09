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

class AddCategory extends Component {
  
  state = {
    parent_id:this.props.category.id?this.props.category.id:undefined,
    show_parent_id:this.props.category.id?this.props.category.id:undefined,
    name:'',
    label:'',
    turkish_name:'',
    turkish_label:'',
    show:'NO',
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
      case 'show':
        this.setState({show:this.state.show=='YES'?'NO':'YES'})
        break;  
      default:
        // code
    }
  }
  
  updateCategory = () => {
    pleasWait(true)
    axios.post(`categories`,{
      'parent_id':this.state.parent_id,
      'name':this.state.name,
      'label':this.state.label,
      'turkish_name':this.state.turkish_name,
      'turkish_label':this.state.turkish_label,
      'show':this.state.show,
    })
    .then((response) => {
      this.props.close()
      this.props.openTree()
      pleasWait(false)
      toastMessages('دسته با موفقیت ایجاد شد','success')
      this.props.setSubCats(response.data.data)
      this.props.close()
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
          <CModalTitle style={{float:'left'}}>افزودن دسته</CModalTitle>
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
            checked={this.state.show=='YES'?true:false}
            onChange={(event) => this.dataHandler(event,'show')}/>
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => this.props.close()}>
            بستن
          </CButton>
          <CButton color="primary" onClick={() => this.updateCategory()}>ذخیره تغییرات</CButton>
        </CModalFooter>
      </CModal>
  }
}

AddCategory.propTypes = {
  category: PropTypes.array,
  close: PropTypes.func,
  openTree: PropTypes.func,
  setSubCats: PropTypes.func,
}
export default AddCategory