import React, {Component} from 'react'
import PropTypes from 'prop-types' 
import Aux from '../../../hoc/Auxx/Auxx'
import store from '../../../store'
import axios from '../../../axios/AxiosApi'
import Show from './Show'
import Edit from './Edit'
import DeleteModal from './DeleteModal'
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
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react'

const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages

class Property extends Component {
  
  state = {
   property:this.props.property,
   propertyTypes:this.props.propertyTypes,
   editData:{
   type_id: this.props.property.type_id,
   label: this.props.property.label,
   turkish_label: this.props.property.turkish_label,
   placeholder: this.props.property.placeholder,
   turkish_placeholder: this.props.property.turkish_placeholder,
   tooltip: this.props.property.tooltip,
   turkish_tooltip:this.props.property.turkish_tooltip,
   maxSize:this.props.property.maxSize,
   minSize:this.props.property.minSize,
   sizeUnit:this.props.property.sizeUnit,
   required:this.props.property.required,
   },
   editFormData:{},
   editing:false,
   sizeUnit:this.props.property.sizeUnit,
  }
  
  
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.property !== state.property) {
      return {
        property: props.property,
        editData:{
        label: props.property.label,
        turkish_label: props.property.turkish_label,
        placeholder: props.property.placeholder,
        turkish_placeholder: props.property.turkish_placeholder,
        tooltip: props.property.tooltip,
        turkish_tooltip: props.property.turkish_tooltip,
        maxSize: props.property.maxSize,
        minSize: props.property.minSize,
        sizeUnit: props.property.sizeUnit,
        required: props.property.required,
        },
        typeName: props.property.typeName,
      };
    }
    return null;
  }
  
  dataHandler = (event,type) => {
    switch (type) {
      case 'type_id':
        this.setState({editData:{...this.state.editData,type_id:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,property_type_id:event.target.value}})
        break;
      case 'label':
        this.setState({editData:{...this.state.editData,label:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,label:event.target.value}})
        break;
      case 'turkish_label':
        this.setState({editData:{...this.state.editData,turkish_label:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,turkish_label:event.target.value}})
        break;
      case 'placeholder':
        this.setState({editData:{...this.state.editData,placeholder:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,placeholder:event.target.value}})
        break;
      case 'turkish_placeholder':
        this.setState({editData:{...this.state.editData,turkish_placeholder:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,turkish_placeholder:event.target.value}})
        break;
      case 'tooltip':
        this.setState({editData:{...this.state.editData,tooltip:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,tooltip:event.target.value}})
        break;
      case 'turkish_tooltip':
        this.setState({editData:{...this.state.editData,turkish_tooltip:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,turkish_tooltip:event.target.value}})
        break;
      case 'minSize':
        this.setState({editData:{...this.state.editData,minSize:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,minSize:event.target.value}})
        break;
      case 'maxSize':
        this.setState({editData:{...this.state.editData,maxSize:event.target.value}})
        this.setState({editFormData:{...this.state.editFormData,maxSize:event.target.value}})
        break;
      case 'required':
        this.setState({editData:{...this.state.editData,required:this.state.editData.required=='YES'?'NO':'YES'}})
        this.setState({editFormData:{...this.state.editFormData,required:this.state.editData.required=='YES'?'NO':'YES'}})
        break;  
      default:
        // code
    }
  }
  closeDeleteModal = () => {
    this.setState({deleting:false})
  }
  
  deleteProperty = (id) => {
    pleasWait(true)
    axios.delete(`properties/${id}`)
    .then((response) => {
      this.props.setProperties(response.data.data)
      this.setState({deleting:false})
      pleasWait(false)
      toastMessages('ویژگی با موفقیت حذف شد','success')
    })
    .catch((response) => {
      toastMessages('خطا در عملیات حذف','danger')
      pleasWait(false)
      this.setState({deleting:false})
    })
  }
  updateProperty = () =>{
    console.log(this.state.editFormData)
    pleasWait(true)
    axios.put(`properties/${this.state.property.id}`,
    this.state.editFormData)
    .then((response) => {
      this.props.setProperties(response.data.data)
      this.setState({editing:false})
      pleasWait(false)
      toastMessages('ویژگی با موفقیت ویرایش شد','success')
    })
    .catch((response) => {
      toastMessages('خطا در عملیات ویرایش','danger')
      pleasWait(false)
      this.setState({editing:false})
    })
  }
  
  render(){
    let options = this.state.propertyTypes.map((item) => {
      return <option value={item.id} sizeUnit={item.sizeUnit} key={item.id} selected={this.state.property.type_id===item.id}>{item.name}</option>
    })
    let typeName = null
    if(this.state.editing)
    {
      typeName = <CFormSelect onChange={(event) => {
                                this.dataHandler(event,'type_id')
                                this.setState({sizeUnit:event.target.options[event.target.selectedIndex].getAttribute('sizeUnit')})
                              }} aria-label="Default select example">
                   {options}
                 </CFormSelect>
    }
    else{
      typeName = this.state.property.typeName
    }
    
    return <CCard  className="text-center mb-5 border-dark">
        <CCardHeader className="text-center">{typeName}</CCardHeader>
        <CCardBody className="text-r">
          {this.state.deleting?<DeleteModal action={() => this.deleteProperty(this.state.property.id)} close={() => this.closeDeleteModal()}/>:null}
          {!this.state.editing?<Show property={{...this.state.property}} />
          :<Edit property={this.state.editData} sizeUnit={this.state.sizeUnit} dataHandler={(event,type) => this.dataHandler(event,type)} />}
        </CCardBody>
        <CCardFooter className="text-medium-emphasis">
        {!this.state.editing?<Aux>
        <CButton className="mx-2" onClick={() => this.setState({editing:true})}>ویرایش</CButton>
        <CButton className="mx-2" color="danger" onClick={() => this.setState({deleting:true})}>حذف</CButton>
        </Aux>
        :null}
        {this.state.editing?<CButton color="success" onClick={() => this.updateProperty()}>ذخیره تغییرات</CButton>:null}
        </CCardFooter>
      </CCard>
  } 

}

Property.propTypes = {
  property: PropTypes.object,
  propertyTypes: PropTypes.array,
  setProperties: PropTypes.func,
}

export default Property