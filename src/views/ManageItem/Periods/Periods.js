import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../../../store'
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
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react'
import Loading from '../../../components/Loading'
import axios from '../../../axios/AxiosApi'
import Period from './Period/Period'
const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages

class Periods extends Component {
  state = {
    periods:[],
    errors:{},
  }
  
  componentDidMount = () => {
    axios.get(`itemPeriods`,{params:{flag:'itemPeriods',search:this.props.item_id}})
    .then((response) => {
      console.log(response.data)
      this.setPeriods(response.data.data)
    })
    .catch((response) => {
      alert('error')
    })
  }
  
  componentWillUnmount = () => {
    
  }
  
  setPeriods = (periods) => {
    periods = periods.filter((value) => {
      value.errors = {
        end: false,
        time: false,
      }
      return true
    })
    
    this.setState({periods:periods})
  }
  
  deletePeriod = (id) => {
    let periods = [...this.state.periods]
    periods = periods.filter(function(value, index, arr){ 
        return value.id != id;
    },id);
    this.setState({periods:periods})
  }
    
  dataHandler = (event,type,id) => {
    let periods = [...this.state.periods]
    switch (type) {
      case 'end':
        periods = periods.filter(function(value, index, arr){ 
          if(value.id == id)
            value.end = parseInt(event.target.value)
            value.endError = false
          return true
        },id,event);
        break;
      case 'time':
        periods = periods.filter(function(value, index, arr){ 
          if(value.id == id)
            value.time = parseInt(event.target.value)
          return true
        },id,event);
        break;
      default:
        // code
    }  
    this.validateData(periods)
  }
  
  newPeriod = () => {
    let periods = [...this.state.periods]
    this.validateData(periods)
    let lastPeriod = periods[periods.length-1]
    if(lastPeriod.end > lastPeriod.start)
    {
      periods.push({
        'id': lastPeriod.id + 1,
        'item_id': lastPeriod.item_id,
        'start': parseInt(lastPeriod.end) + 1,
        'end': 0,
        'time': lastPeriod.time,
        errors:{
          end:false,
          time:false,
        }
      })
    }
    else
    {
      periods[periods.length+1].errors.end = true
    }
    
    this.setState({periods:periods})
  }
  validateData = (periods) => {
    let hasError = false
    periods.filter(function(period){
      period.errors.time=false
      period.errors.end = false
      if(!period.time)
      {
        hasError = true
        period.errors.time = 'زمان نمیتواند خالی باشد'
      }
      if(!period.end||period.end <= period.start)
      {
        hasError = true
        period.errors.end = 'پایان نمیتواند کمتر از شروع باشد'
      }
      return true
    },hasError)
   console.log('hasError',hasError)
    this.setState({periods:periods})
    return hasError
  }
  
  updatePeriod = () => {
    let periodArray = [...this.state.periods]
    if(this.validateData(periodArray)){
      return false
    }
    let formData = {
      periodArray:`${JSON.stringify(periodArray)}`
    }
    pleasWait(true)
    axios.put(`itemPeriods/${this.props.item_id}`,formData)
    .then((response) => {
      pleasWait(false)
      toastMessages('بازه ها با موفقیت بروزرسانی شد.','success')
      this.setPeriods(response.data.data)
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در بروز رسانی','danger')
      alert('error')
    })
  }
  
  render(){
    let rows = this.state.periods.map((period,index) => {
      let last = this.state.periods.length == (index+1)
      return <Period dataHandler={(event,type,id) => this.dataHandler(event,type,id)} key={period.id} last={last} period={period} index={index} deletePeriod={(id) => this.deletePeriod(id)} />
    })
    return <CCard  className="text-center mb-5 border-dark">
        <CCardHeader className="text-center"></CCardHeader>
        <CCardBody className="text-r">
<CTable responsive>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">ردیف</CTableHeaderCell>
      <CTableHeaderCell scope="col">شروع</CTableHeaderCell>
      <CTableHeaderCell scope="col">پایان</CTableHeaderCell>
      <CTableHeaderCell scope="col">زمان</CTableHeaderCell>
      <CTableHeaderCell scope="col">عملیات</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {rows}
  </CTableBody>
</CTable>

        </CCardBody>
        <CCardFooter className="text-medium-emphasis">
          <CButton color="success" className="mx-2"
           onClick={() => this.updatePeriod()}>ذخیره تغییرات</CButton>
          <CButton color="warning"
          onClick={() => this.newPeriod()} className="mx-2">بازه جدید</CButton>
        </CCardFooter>
      </CCard>
  }
}

Periods.propTypes = {
  item_id: PropTypes.number,
}

export default Periods