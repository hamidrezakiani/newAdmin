import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Aux from '../../../hoc/Auxx/Auxx'
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
  CTableDataCell
} from '@coreui/react'

class Edit extends Component {
  
  state = {
   property:this.props.property,
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
  }
  
  
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.property !== state.property) {
      return {
        property: props.property,
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
        typeName: props.property.typeName,
      };
    }
    return null;
  }

  
  render() {
    return <Aux>
             <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام فیلد</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.label}
                        onChange={(event) => this.props.dataHandler(event,'label')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام فیلد ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.turkish_label}
                        onChange={(event) => this.props.dataHandler(event,'turkish_label')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">place holder</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.placeholder}
                        onChange={(event) => this.props.dataHandler(event,'placeholder')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">turkish place holder</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.turkish_placeholder}
                        onChange={(event) => this.props.dataHandler(event,'turkish_placeholder')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">راهنما</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.tooltip}
                        onChange={(event) => this.props.dataHandler(event,'tooltip')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">راهنما ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.turkish_tooltip}
                        onChange={(event) => this.props.dataHandler(event,'turkish_tooltip')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">حداقل سایز ({this.props.sizeUnit})</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.minSize}
                        onChange={(event) => this.props.dataHandler(event,'minSize')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">حداکثر سایز ({this.props.sizeUnit})</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.property.maxSize}
                        onChange={(event) => this.props.dataHandler(event,'maxSize')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CFormSwitch label="اجباری" 
            checked={this.props.property.required=='YES'?true:false}
            onChange={(event) => this.props.dataHandler(event,'required')}/>
          </CInputGroup>
           </Aux>
  }
}

Edit.propTypes = {
  property: PropTypes.array,
  dataHandler: PropTypes.func,
  sizeUnit: PropTypes.string,
}

export default Edit