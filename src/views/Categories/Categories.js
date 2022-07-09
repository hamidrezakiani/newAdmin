import React, { Component } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from '../../axios/AxiosApi'
import Loading from '../../components/Loading'
import store from '../../store'
import Category from './Category/Category'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const errorHandler = store.getState().errorHandler
class Categories extends Component{
  state = {
    loading:false,
    subcats:null
  }
  
  componentDidMount(){
    if(!this.state.subcats)
    this.getSubcats();
  }
  getSubcats = () => {
    this.setState({loading:true})
    axios.get('categories',{params: {flag: 'tree'}})
      .then((response) => {
        this.setState({subcats:response.data.data.categories})
       this.setState({loading:false})
      })
      .catch((response) => {
        this.setState({loading:false})
        errorHandler('erros')
      })
  }
  render(){
    let categories = null;
    if(this.state.subcats){
    categories = this.state.subcats.map(cat => {
      return <Category key={cat.id} name={cat.name} subCat={cat.subCats.categories} />
    })
    }
    //console.log(categories)
    let content = this.state.loading ? <Loading /> : <div id="category">{categories}</div>
    return content
  }
}

export default Categories
