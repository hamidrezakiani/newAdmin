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
  CTableDataCell,
  CFormSelect
} from '@coreui/react'

class Add extends Component {

  state = {
    sizeUnit:null,
  }
  
  render(){ 
    let options = this.props.propertyTypes.map((item) => {
      return <option value={item.id} sizeUnit={item.sizeUnit} key={item.id}>{item.name}</option>
    })
    
    return <CCard  className="text-center mb-5 border-dark">
            <CCardHeader className="text-center">
             <CFormSelect onChange={(event) => {
                            this.props.dataHandler(event,'type_id')
                            this.setState({sizeUnit:event.target.options[event.target.selectedIndex].getAttribute('sizeUnit')})
                          }} aria-label="Default select example">
                <option key="0">نوع ویژگی را انتخاب کنید</option>
                {options}
             </CFormSelect>
             </CCardHeader>
             <CCardBody className="text-r">
             <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام فیلد</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'label')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">نام فیلد ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'turkish_label')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">place holder</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'placeholder')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">turkish place holder </CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'turkish_placeholder')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">راهنما</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'tooltip')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">راهنما ترکی</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'turkish_tooltip')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">حداقل سایز ({this.state.sizeUnit})</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'minSize')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CInputGroupText id="inputGroup-sizing-sm">حداکثر سایز ({this.state.sizeUnit})</CInputGroupText>
            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => this.props.dataHandler(event,'maxSize')}/>
          </CInputGroup>
          <CInputGroup size="sm" className="mb-3">
            <CFormSwitch label="اجباری" 
            onChange={(event) => this.props.dataHandler(event,'required')}/>
          </CInputGroup>
          </CCardBody>
        <CCardFooter className="text-medium-emphasis">
        <CButton color="light" onClick={() => this.props.close()}>انصراف</CButton>
        <CButton color="success" onClick={() => this.props.submit()}>ثبت</CButton>
        </CCardFooter>
           </CCard>
  }
}

Add.propTypes = {
  propertyTypes: PropTypes.array,
  dataHandler: PropTypes.func,
  close: PropTypes.func,
  submit: PropTypes.func,
}

export default Add