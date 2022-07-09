import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormInput,
  CTooltip,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
class Period extends Component {
  start = {
    editing:false,
  }
  
  render() {
    console.log(Boolean(this.props.period.errors.time),this.props.period.id)
    return <CTableRow>
      <CTableHeaderCell scope="row">{this.props.index+1}</CTableHeaderCell>
      <CTableDataCell>{this.props.period.start}</CTableDataCell>
      <CTableDataCell>
      {this.props.last?<><CFormInput color="danger" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        value={this.props.period.end}
                        type="number"
                        style={{width:'150px',textAlign:'left'}}
                        onChange={(event) => this.props.dataHandler(event,'end',this.props.period.id)}
            /><label style={{color:'red',fontSize:'12px'}}>{this.props.period.errors.end}</label></>:
      this.props.period.end}
      </CTableDataCell>
      <CTableDataCell style={{width:'180px'}}>
      <CInputGroup style={{minWidth:'200px'}}>
        <CInputGroupText>حداکثر</CInputGroupText>
        <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                  value={this.props.period.time}
                  type="number"
                  style={{width:'50px',textAlign:'left'}}
                  onChange={(event) => this.props.dataHandler(event,'time',this.props.period.id)}
        />
        <CInputGroupText>
        ساعت
        </CInputGroupText>
      </CInputGroup>
      <strong style={{color:'red',fontSize:'12px'}}>{this.props.period.errors.time}</strong>
      </CTableDataCell>
      <CTableDataCell>
      {this.props.index?<CButton color="danger" disabled={!this.props.last} onClick={() => this.props.deletePeriod(this.props.period.id)}>
         حذف
      </CButton>:null}
      </CTableDataCell>
    </CTableRow>
  }
}

Period.propTypes = {
  period: PropTypes.object,
  index: PropTypes.number,
  last: PropTypes.bool,
  deletePeriod: PropTypes.func,
  dataHandler: PropTypes.func,
}

export default Period