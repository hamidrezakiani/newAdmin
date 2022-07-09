import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableHead,
  CTableBody,
  CSpinner,
} from '@coreui/react'
import axios from '../../../axios/AxiosApi'
import store from '../../../store'
import classes from './Participations.module.css'

const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages

class Participations extends Component {
  
  state = {
    participations:[],
    selectedParticipation:null,
    participationPeriods:[],
    getingPeriods:false,
  }
  
  setParticipations = (participations) => {
    participations = participations.filter((value) => {
      value.checked = value.item_id == this.props.item_id
      return true
    })
    let selectedParticipation = null
    let participationPeriods = []
    participations = participations.filter((value) => {
      value.checked = value.item_id == this.props.item_id
      if(!selectedParticipation)
        selectedParticipation = value.checked ? value.id : null
      if(value.checked)
        participationPeriods = value.periods
      return value
    },selectedParticipation,participationPeriods)
    participations.push({
      executerName: 'هیچکدام',
       checked: !selectedParticipation,
       periods:[],
    })
    this.setState({participationPeriods:participationPeriods})
    this.setState({selectedParticipation:selectedParticipation})
    this.setState({participations:participations})
  }
  
  saveChanges = () => {
    pleasWait(true)
    axios.put(`itemParticipation/${this.props.item_id}`,{participation_id:this.state.selectedParticipation})
    .then((response) => {
      pleasWait(false)
      toastMessages('مجری با موفقیت انتخاب شد.','success')
      this.setParticipations(response.data.data)
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در عملیات','danger')
    })
  }
  
  componentDidMount = () => {
    axios.get(`participations`,{params:{flag:'productParticipations',search:this.props.product_id}})
    .then((response) => {
      this.setParticipations(response.data.data)
    })
    .catch((response) => {
      alert('error')
    })
  }
  
  selectParticipation = (id) => {
    this.setState({selectedParticipation:id})
    let participations = [...this.state.participations]
    let participationPeriods = []
    participations.filter((value) => {
      value.checked = value.id == id
      if(value.checked)
       participationPeriods = value.periods
      return value
    },id,participationPeriods)
    this.setState({participationPeriods:participationPeriods})
    this.setState({participations:participations})
  }

  render(){
    const participations = [...this.state.participations]
    const participationPeriods = [...this.state.participationPeriods]
    let participationsList = participations.map((participation) => {
      let color = participation.checked?'success':''
      return <CListGroupItem color={color} key={participation.id} style={{width:'100%'}}>
               <CFormCheck onChange={() => this.selectParticipation(participation.id)} type="radio"  label={participation.executerName} checked={participation.checked}/>
             </CListGroupItem>
    })
    let participationPeriodsList = this.state.participationPeriods.map((period,index) => {
       return <CTableRow key={period.id}>
                <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                <CTableDataCell>{period.start}</CTableDataCell>
                <CTableDataCell>{period.end}</CTableDataCell>
                <CTableDataCell>{period.start}</CTableDataCell>
              </CTableRow>
    })
    
    if(this.state.getingPeriods)
     participationPeriodsList = <CTableRow>
       <CTableDataCell colSpan="4">
       <CSpinner color="light" variant="grow"/>
       <CSpinner color="info" variant="grow"/>
       <CSpinner color="primary" variant="grow"/>
       <CSpinner color="info" variant="grow"/>
       <CSpinner color="light" variant="grow"/>
       </CTableDataCell>
     </CTableRow>
    
    if(!this.state.selectedParticipation)
     participationPeriodsList = <CTableRow>
       <CTableDataCell colSpan="4">
          هیچ مجری برای این آیتم انتخاب نشده است!!!
       </CTableDataCell>
     </CTableRow>
    
    return <><CCard  className="text-center mb-5 border-dark">
        <CCardHeader className="text-center">یک مجری برای این آیتم انتخاب کنید.</CCardHeader>
        <CCardBody className="text-r">
          <CListGroup className={classes.participationsListGroup}>
           {participationsList}
          </CListGroup>
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ردیف</CTableHeaderCell>
                <CTableHeaderCell scope="col">شروع</CTableHeaderCell>
                <CTableHeaderCell scope="col">پایان</CTableHeaderCell>
                <CTableHeaderCell scope="col">قیمت</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
             {participationPeriodsList}
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter className="text-medium-emphasis">
          <CButton color="success" onClick={() => this.saveChanges()}>ذخیره تغییرات</CButton>
        </CCardFooter>
      </CCard></>
      
  }
}

Participations.propTypes = {
  item_id: PropTypes.number,
  product_id: PropTypes.number,
}

export default Participations