import React, { Component } from 'react'

import Aux from '../../../hoc/Auxx/Auxx'
import axios from '../../../axios/AxiosApi'
import EditCategory from './EditCategory'
import AddCategory from './AddCategory'
import Product from '../Product/Product'
import AddProduct from '../Product/AddProduct'
import EditProduct from '../Product/EditProduct'
import treeClasses from '../Tree.module.css'
import { CToaster,CToast,CToastBody } from '@coreui/react'
import store from '../../../store'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon/Icon'
import {
  folder,
  process,
  plus,
  add,
  pencil,
  edit,
  cut,
  copyPaste,
  link,
  up,
  down,
} from '../../../components/Icon/IconReference'
const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages  
class Category extends Component {
 
 state = {
   open: false,
   actionBox:false,
   actionButton:true,
   categories:{...this.props.category},
   subCategories:this.props.category.subCats,
   products:this.props.category.products,
   test:this.props.category,
   newData:this.props.newData,
   editCategoryModal:false,
   editingCategoryData:null,
   addCategoryModal:false,
   editProductModal:false,
   editingProductData:null,
   addProductModal:false,
   pleasWait:false,
 }
 openTree = () => {
   this.setState({open:true})
 }
 componentDidUpdate(prevProps,prevState){
   if(this.props.category !== prevProps.category)
     this.setState({categories:this.props.category})
   return true;
 }
 
 toggleHandler = () => {
  // this.setState({actionButton:!this.state.actionButton})
  // this.setState({actionBox:false})
   this.setState({open: !this.state.open})
 }
 
 actionBoxToggleHandler = () => {
   this.setState({actionBox: !this.state.actionBox})
 }
 
 setSubCatAfterUpdate = (categories) => {
    this.setState({subCategories:categories})
  }
  
  
  editCategoryModalHandler = (category) => {
    this.setState({editingCategoryData:category,editCategoryModal:true})
  }
  
  closeCategoryEditModal = () => {
    this.setState({editCategoryModal:false})
  }
  
  editProductModalHandler = (product) => {
    this.setState({editingProductData:product,editProductModal:true})
  }
  
  closeProductEditModal = () => {
    this.setState({editProductModal:false})
  }
  
  addCategoryModalHandler = () => {
    this.setState({addCategoryModal:true})
  }
  
  closeCategoryAddModal = () => {
    this.setState({addCategoryModal:false})
  }
 
  addProductModalHandler = () => {
    this.setState({addProductModal:true})
  }
  
  closeProductAddModal = () => {
    this.setState({addProductModal:false})
  }
  
  setProductsAfterUpdate = (products) => {
    this.setState({products:products})
  }
  
 moveToUp = (id) => {
    pleasWait(true)
    axios.post(`categories/move-up/${id}`)
      .then((response) => {
     pleasWait(false)
        toastMessages('دسته با موفقیت جابجا شد','success')
        this.setState({subCategories:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجایی','danger')
      })
  }
  
  moveToDown = (id) => {
    pleasWait(true)
    axios.post(`categories/move-down/${id}`)
      .then((response) => {
        pleasWait(false)
        toastMessages('دسته با موفقیت جابجا شد','success')
        this.setState({subCategories:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجايي','danger')
      })
  }
  
  productMoveToUp = (id) => {
    pleasWait(true)
    axios.post(`products/move-up/${id}`)
      .then((response) => {
        pleasWait(false)
        toastMessages('محصول با موفقیت جابجا شد','success')
        this.setState({products:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجایی','danger')
      })
  }
  
  productMoveToDown = (id) => {
    pleasWait(true)
    axios.post(`products/move-down/${id}`)
      .then((response) => {
        pleasWait(false)
        toastMessages('محصول با موفقیت جابجا شد','success')
        this.setState({products:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجايي','danger')
      })
  }
  
  cutCategiryHandler = (category) => {
    let subCats = [...this.state.subCategories]
    store.dispatch({type: 'set',cutCategory:category})
   subCats = subCats.filter(function(value, index, arr){ 
        return value.id != category.id;
    },category);
    this.setState({subCategories:subCats})
  }
  
  pasteCutedCategory = (category) => {
    pleasWait(true)
    const cutCategory = store.getState().cutCategory
    const subCats = this.state.subCategories
    const tab_index = subCats.length?(subCats[subCats.length - 1].tab_index + 1):0
    axios.put(`categories/${cutCategory.id}`,{
      'parent_id':category.id,
      'tab_index':tab_index,
    })
    .then((response) => {
      pleasWait(false)
      toastMessages('دسته با موفقیت انتقال یافت','success')
      this.setSubCatAfterUpdate(response.data.data)
      store.dispatch({type: 'set',cutCategory:null})
      this.setState({actionBox:false})
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در عملیات انتقال','danger')
    })
  }
  
  cutProductHandler = (product) => {
    let products = [...this.state.products]
    store.dispatch({type: 'set',cutProduct:product})
   products = products.filter(function(value, index, arr){ 
        return value.id != product.id;
    },product);
    this.setState({products:products})
  }
  
  pasteCutedProduct = () => {
    pleasWait(true)
    const cutProduct = store.getState().cutProduct
    const products = this.state.products
    const tab_index = products.length?products[products.length - 1].tab_index + 1:0
    axios.put(`products/${cutProduct.id}`,{
      'category_id':this.state.categories.id,
      'tab_index':tab_index,
    })
    .then((response) => {
      pleasWait(false)
      toastMessages('محصول با موفقیت انتقال یافت','success')
      this.setProductsAfterUpdate(response.data.data)
      store.dispatch({type: 'set',cutProduct:null})
      this.setState({actionBox:false})
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در عملیات انتقال','danger')
    })
  }
  
 render(){
   const cutCategory = store.getState().cutCategory
   const cutProduct = store.getState().cutProduct
   let category = this.state.categories
   let products = this.state.products
   let subCategories = this.state.subCategories
   let tree = null
   if(subCategories.length&&this.state.open)
     tree = subCategories.map(cat => {
       return <Category 
         cut={(category) => this.cutCategiryHandler(category)} 
         newData={false} key={cat.id} 
         moveUp={this.moveToUp}
         editCatModal={this.editCategoryModalHandler}
         moveDown={this.moveToDown} 
         category={cat} />
     })
    else if(products&&this.state.open)
      tree = products.map(product => {
        return <Product
                 product={product}
                 key={product.id}
                 cut={(product) => this.cutProductHandler(product)}
                 moveUp={this.productMoveToUp}
                 moveDown={this.productMoveToDown}
                 editProductModal={this.editProductModalHandler}
                />
      })
  let classes = {
    active: treeClasses.nested,
    caret: treeClasses.caret,
    open:'',
    treeActionIconOpen:'',
    actionBox:[treeClasses.actionBox,treeClasses.actionClose].join(' '),
  }
  if(this.state.open){
    classes.active = treeClasses.active
    classes.caret = treeClasses.caretDown
    classes.open = treeClasses.open
  }
  
  if(this.state.actionBox){
    classes.actionBox = [treeClasses.actionBox,treeClasses.actionOpen].join(' ')
    classes.treeActionIconOpen = treeClasses.treeActionIconOpen
  }
  
  if(tree != null)
    tree = <ul className={[classes.active , treeClasses.treeUl].join(' ')}>{tree}</ul>
   return <Aux>
          {this.state.editProductModal?<EditProduct product={this.state.editingProductData} setProducts={(products) => this.setProductsAfterUpdate(products)} close={this.closeProductEditModal}/>:null}
          {this.state.editCategoryModal?<EditCategory category={this.state.editingCategoryData} setSubCats={(categories) => this.setSubCatAfterUpdate(categories)} close={this.closeCategoryEditModal}/>:null}
          {this.state.addCategoryModal?<AddCategory openTree={() => this.openTree()} category={category} close={this.closeCategoryAddModal} setSubCats={(categories) => this.setSubCatAfterUpdate(categories)} />:null}
          {this.state.addProductModal?<AddProduct openTree={() => this.openTree()} category={category} close={this.closeProductAddModal} setProducts={(products) => this.setProductsAfterUpdate(products)} />: null}
          <li className={treeClasses.treeLi}>
          <div className={treeClasses.liContents}>
          <div 
            className={classes.caret}
            onClick={() => this.toggleHandler()}
          >
            <span className={[classes.open , treeClasses.treeSpan].join(' ')}>
              <Icon className={treeClasses.treeCategoryIcon} icon={folder} />
              <i className={treeClasses.categoryName}>{category.name}</i>
            </span>
          </div>
          {this.state.actionButton?
          <div className={treeClasses.actionBoxArea}>
            <Icon onClick={() => this.actionBoxToggleHandler()} className={[treeClasses.treeActionIcon,classes.treeActionIconOpen].join(' ')} icon={process} width="25" height="25" />
            <div className={classes.actionBox}>
              {!products.length? <Icon
                icon={plus}
                className={[treeClasses.actionIcons,treeClasses.addCategoryIcon].join(' ')}
                onClick={() => {
                  this.addCategoryModalHandler()
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />:null}
              {!subCategories.length? <Icon
                icon={add}
                className={[treeClasses.actionIcons,treeClasses.addProductIcon].join(' ')}
                onClick={() => {
                  this.addProductModalHandler()
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />:null}
              {category.id!=0?<Aux>
              <Icon
                icon={up}
                className={treeClasses.actionIcons}
                onClick={() => this.props.moveUp(category.id)}
                width="22"
                height="22"
               />
              <Icon
                icon={down} 
                className={treeClasses.actionIcons}
                onClick={() => this.props.moveDown(category.id)}
                height="20"
                width="20"
              />
              <Icon
                icon={cut} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.props.cut(category)
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />
              <Icon
                icon={edit} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.props.editCatModal(category)
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              /></Aux>:null}
              {cutCategory? <Icon
                icon={copyPaste}
                className={[treeClasses.actionIcons,treeClasses.pasteCategoryIcon].join(' ')}
                onClick={() => {
                this.pasteCutedCategory(category)
                this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />:null}
              {cutProduct? <Icon
                icon={copyPaste}
                className={[treeClasses.actionIcons,treeClasses.pasteProductIcon].join(' ')}
                onClick={() => {
                this.pasteCutedProduct()
                this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />:null}
            </div>
          </div>:null}
          </div>
            {tree}
          </li>
          </Aux>
 } 
 
}

Category.propTypes = {
  name: PropTypes.string,
  category: PropTypes.object,
  newData: PropTypes.bool,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  cut: PropTypes.func,
  editCatModal: PropTypes.func,
  
}
export default Category