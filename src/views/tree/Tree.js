import React, { Component } from 'react'
import {
  CCard, 
  CCardBody, 
  CCol, 
  CCardHeader, 
  CRow,
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
import CIcon from '@coreui/icons-react'
import axios from '../../axios/AxiosApi'
import Aux from '../../hoc/Auxx/Auxx'
import Loading from '../../components/Loading'
import store from '../../store'
import Category from './Category/Category'
import treeClasses from './Tree.module.css'
import EditCategory from './Category/EditCategory'
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
class Tree extends Component{
  state = {
    loading:false,
    subcats:null,
    check:false,
    editCategoryModal:false,
    editingCategoryData:null,
  }
  
  componentDidMount(){
    if(!this.state.subcats)
    this.getSubcats();
  }
  getSubcats = () => {
    this.setState({loading:true})
    axios.get('categories',{params: {flag: 'tree'}})
      .then((response) => {
        this.setState({subcats:response.data.data})
       this.setState({loading:false})
      })
      .catch((response) => {
        this.setState({loading:false})
        errorHandler('erros')
      })
  }
  
  moveToUp = (id) => {
    axios.post(`categories/move-up/${id}`)
      .then((response) => {
        this.setState({subcats:response.data.data.categories})
      })
      .catch((response) => {
        errorHandler('erros2')
      })
  }
  
  moveToDown = (id) => {
    axios.post(`categories/move-down/${id}`)
      .then((response) => {
        this.setState({subcats:response.data.data.categories})
      })
      .catch((response) => {
        errorHandler('erros2')
      })
  }
  
  setSubCatAfterUpdate = (categories) => {
    this.setState({subcats:categories})
  }
  
  
  editCategoryModalHandler = (category) => {
    this.setState({editingCategoryData:category,editCategoryModal:true})
  }
  
  closeCategoryEditModal = () => {
    this.setState({editCategoryModal:false})
  }
  
  render(){
    let categories = null
    if(this.state.subcats){
      let category = {}
    category.name = 'دسته بندی'
    category.id=0
    category.subCats = this.state.subcats
    category.products = []
    category.count_subCat = this.state.subcats.length
    categories = <Category key={category.id} classes={treeClasses} moveUp={this.moveToUp} moveDown={this.moveToDown} editCatModal={this.editCategoryModalHandler} category={category} />
    }
  
    let content = this.state.loading ? <Loading /> : 
      <div className={treeClasses.category}>
        <ul className={[treeClasses.catUl , treeClasses.treeUl].join(' ')}>{categories}</ul>
      {this.state.editCategoryModal?<EditCategory show={this.state.editCategoryModal} category={this.state.editingCategoryData} setSubCats={(categories) => this.setSubCatAfterUpdate(categories)} close={this.closeCategoryEditModal}/>:null}
      </div>
    return content
  }
}

export default Tree
