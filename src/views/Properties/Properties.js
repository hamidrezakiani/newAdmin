import React , {Component} from 'react'
import axios from '../../axios/AxiosApi'
import store from '../../store'
import Property from './Property/Property'
import PropTypes from 'prop-types'
import Add from './Property/Add'
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

class Properties extends Component {
  
  state = {
    properties:[...this.props.properties],
    propertyTypes:[...this.props.propertyTypes],
    product:this.props.product,
    addingNewProperty:false,
    addFormData:{

    },
  }
  
  setPropertiesAfterUpdate = (properties) => {
    this.setState({properties:properties})
  }
  
  dataHandler = (event,type) => {
    switch (type) {
      case 'type_id':
        this.setState({addFormData:{...this.state.addFormData,property_type_id:event.target.value}})
        break;
      case 'label':
        this.setState({addFormData:{...this.state.addFormData,label:event.target.value}})
        break;
      case 'turkish_label':
        this.setState({addFormData:{...this.state.addFormData,turkish_label:event.target.value}})
        break;
      case 'placeholder':
        this.setState({addFormData:{...this.state.addFormData,placeholder:event.target.value}})
        break;
      case 'turkish_placeholder':
        this.setState({addFormData:{...this.state.addFormData,turkish_placeholder:event.target.value}})
        break;
      case 'tooltip':
        this.setState({addFormData:{...this.state.addFormData,tooltip:event.target.value}})
        break;
      case 'turkish_tooltip':
        this.setState({addFormData:{...this.state.addFormData,turkish_tooltip:event.target.value}})
        break;
      case 'minSize':
        this.setState({addFormData:{...this.state.addFormData,minSize:event.target.value}})
        break;
      case 'maxSize':
        this.setState({addFormData:{...this.state.addFormData,maxSize:event.target.value}})
        break;
      case 'required':
        this.setState({addFormData:{...this.state.addFormData,required:this.state.addFormData.required=='YES'?'NO':'YES'}})
        break;  
      default:
        // code
    }
  }
  
  addProperty = () =>{
    let formData = {...this.state.addFormData}
    formData = {...formData,product_id:this.state.product.id}
    console.log(formData)
    pleasWait(true)
    axios.post(`properties`,
    formData)
    .then((response) => {
      this.setPropertiesAfterUpdate(response.data.data)
      pleasWait(false)
      this.closeAddPropertyBox()
      toastMessages('ویژگی با موفقیت افزوده شد','success')
    })
    .catch((response) => {
      toastMessages('خطا در عملیات ثبت','danger')
      pleasWait(false)
    })
  }

  closeAddPropertyBox = () => {
    this.setState({addingNewProperty:false})
    this.setState({addFormData:{required:false}})
  }
  
  render(){
    let properties = [...this.state.properties]
    let propertyTypes = [...this.state.propertyTypes]
    let content = properties.map((property) => {
      return <Property key={property.id} propertyTypes={propertyTypes} setProperties={(properties) => this.setPropertiesAfterUpdate(properties)} property={property} />
    })
    return <CModal visible={true}
              fade={true}
              alignment="center"
              fullscreen
      >
        <CModalHeader closeButton={false}>
          <CModalTitle style={{float:'left'}}>ویژگی ها</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {content}
          {this.state.addingNewProperty?<Add dataHandler={(event,type) => this.dataHandler(event,type)} close={() => this.closeAddPropertyBox()} submit={() => this.addProperty()} propertyTypes={this.state.propertyTypes}/>:null}
        </CModalBody>
        <CModalFooter>
         <CButton color="secondary" onClick={() => this.props.close()}>
            بستن
          </CButton>
          <CButton color="warning" onClick={() => this.setState({addingNewProperty:true})}>
            افزودن ویژگی جدید
          </CButton>
        </CModalFooter>
      </CModal>
  }
}

Properties.propTypes = {
  properties: PropTypes.array,
  propertyTypes: PropTypes.array,
  close: PropTypes.func,
  product: PropTypes.object,
}

export default Properties