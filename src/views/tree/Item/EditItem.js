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

class EditItem extends Component {
  
  state = {
    id:this.props.item.id,
    name:this.props.item.name,
    alias:this.props.item.alias,
    turkish_name:this.props.item.turkish_name,
    turkish_alias:this.props.item.turkish_alias,
    viewable:this.props.item.viewable,
    sendingRequest:false,
    sendButtonText:'ذخیره تغییرات',
  }
  
  componentDidUpdate(prevProps,prevState){
   if(this.props.item !== prevProps.item)
     this.setState({
       id:this.props.item.id,
       name:this.props.item.name,
       alias:this.props.item.alias,
       turkish_name:this.props.item.turkish_name,
       turkish_alias:this.props.item.turkish_alias,
       viewable:this.props.item.viewable,
     })
   return true;
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
  
  updateItem = () => {
    this.setState({sendingRequest:true})
    this.setState({sendButtonText:'لطفا صبر کنید ...'})
   // pleasWait(true)
    axios.put(`items/${this.state.id}`,{
      'name':this.state.name,
      'alias':this.state.alias,
      'turkish_name':this.state.turkish_name,
      'turkish_alias':this.state.turkish_alias,
      'viewable':this.state.viewable,
    })
    .then((response) => {
      this.props.close()
      pleasWait(false)
      toastMessages('آیتم با موفقیت ویرایش شد','success')
      this.props.setItems(response.data.data)
      this.props.close()
      this.setState({sendingRequest:false})
      this.setState({sendButtonText:'ذخیره تغییرات'})
    })
    .catch((response) => {
      toastMessages('خطا در عملیات ویرایش','danger')
      pleasWait(false)
      this.setState({sendingRequest:false})
      this.setState({sendButtonText:'ذخیره تغییرات'})
    })
  }
  render(){
    return <CModal visible="true"
              alignment="center"
      >
        <CModalHeader closeButton={false}>
          <CModalTitle style={{float:'left'}}>ویرایش آیتم</CModalTitle>
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
          <CButton color="primary" disabled={this.state.sendingRequest} onClick={() => this.updateItem()}>{this.state.sendButtonText}</CButton>
        </CModalFooter>
      </CModal>
  }
}

EditItem.propTypes = {
  item: PropTypes.array,
  close: PropTypes.func,
  setItems: PropTypes.func,
}

export default EditItem