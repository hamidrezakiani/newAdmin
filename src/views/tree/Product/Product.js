import React, { Component } from 'react'
import AddItem from '../Item/AddItem'
import EditItem from '../Item/EditItem'
import Item from '../Item/Item'
import Properties from '../../Properties/Properties'
import treeClasses from '../Tree.module.css'
import Aux from '../../../hoc/Auxx/Auxx'
import store from '../../../store'
import axios from '../../../axios/AxiosApi'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon/Icon'
import {
  file,
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
  databaseInfo,
} from '../../../components/Icon/IconReference'

const pleasWait = store.getState().pleasWait
const toastMessages = store.getState().toastMessages
class Product extends Component {
  
  state = {
   open: false,
   actionBox:false,
   actionButton:true,
   product:{...this.props.product},
   items:[...this.props.product.items],
   properties:[...this.props.product.properties],
   propertyTypes:this.props.product.propertyTypes,
   newData:this.props.newData,
   addItemModal:false,
   editItemModal:false,
   editingItemData:null,
   propertiesModal:false,
   pleasWait:false,
 }
  
 componentDidUpdate(prevProps,prevState){
   if(this.props.product !== prevProps.product)
     this.setState({product:this.props.product,actionBox:false})
   return true;
 }
 
 openTree = () => {
   this.setState({open:true})
 }
 
 toggleHandler = () => {
   this.setState({open: !this.state.open})
 }
 
 actionBoxToggleHandler = () => {
   this.setState({actionBox: !this.state.actionBox})
 }
 
  addItemModalHandler = () => {
    this.setState({addItemModal:true})
  }
  
  closeItemAddModal = () => {
    this.setState({addItemModal:false})
  }
  
  propertiesModalHandler = () => {
    this.setState({propertiesModal:true})
  }
  
  closePropertiesModal = () => {
    this.setState({propertiesModal:false})
  }
  
  editItemModalHandler = (item) => {
    this.setState({editingItemData:item,editItemModal:true})
  }
  
  closeItemEditModal = () => {
    this.setState({editItemModal:false})
  }
  
  setItemsAfterUpdate = (items) => {
    this.setState({items:items})
  }
 
  cutItemHandler = (item) => {
    let items = [...this.state.items]
    store.dispatch({type: 'set',cutItem:item})
    items = items.filter(function(value, index, arr){ 
        return value.id != item.id;
    },item);
    this.setState({items:items})
  }
  
  pasteCutedItem = () => {
    pleasWait(true)
    const cutItem = store.getState().cutItem
    const items = this.state.items
    const tab_index = items.length?items[items.length - 1].tab_index + 1:0
    axios.put(`items/${cutItem.id}`,{
      'product_id':this.state.product.id,
      'tab_index':tab_index,
    })
    .then((response) => {
      pleasWait(false)
      toastMessages('آیتم با موفقیت انتقال یافت','success')
      this.setItemsAfterUpdate(response.data.data)
      store.dispatch({type: 'set',cutItem:null})
      this.setState({actionBox:false})
    })
    .catch((response) => {
      pleasWait(false)
      toastMessages('خطا در عملیات انتقال','danger')
    })
  }
  
  itemMoveToUp = (id) => {
    pleasWait(true)
    axios.post(`items/move-up/${id}`)
      .then((response) => {
        pleasWait(false)
        toastMessages('آیتم با موفقیت جابجا شد','success')
        this.setState({items:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجایی','danger')
      })
  }
  
  itemMoveToDown = (id) => {
    pleasWait(true)
    axios.post(`items/move-down/${id}`)
      .then((response) => {
        pleasWait(false)
        toastMessages('آیتم با موفقیت جابجا شد','success')
        this.setState({items:response.data.data})
      })
      .catch((response) => {
        pleasWait(false)
        toastMessages('خطا در عملیات جابجايي','danger')
      })
  }
  render(){
    let product = this.state.product
    let items = this.state.items
    let properties = this.state.properties
    let propertyTypes = this.state.propertyTypes
    const cutItem = store.getState().cutItem
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
  let tree = null
    if(this.state.open)
      tree = items.map(item => {
        return <Item
                 item={item}
                 key={item.id}
                 cut={(item) => this.cutItemHandler(item)}
                 moveUp={this.itemMoveToUp}
                 moveDown={this.itemMoveToDown}
                 editItemModal={this.editItemModalHandler}
                />
      })
      
      if(tree != null)
    tree = <ul className={[classes.active , treeClasses.treeUl].join(' ')}>{tree}</ul>
    return <Aux>
          {this.state.editItemModal?<EditItem item={this.state.editingItemData} setItems={(items) => this.setItemsAfterUpdate(items)} close={this.closeItemEditModal}/>:null}
          {this.state.addItemModal?<AddItem openTree={() => this.openTree()} product={product} close={this.closeItemAddModal} setItems={(items) => this.setItemsAfterUpdate(items)} />:null}
          {this.state.propertiesModal?<Properties product={product} propertyTypes={propertyTypes} properties={properties} close={this.closePropertiesModal} />:null}
          <li className={treeClasses.treeLi}>
          <div className={treeClasses.liContents}>
          <div 
            className={classes.caret}
            onClick={() => this.toggleHandler()}
          >
            <span className={[classes.open , treeClasses.treeSpan].join(' ')}>
              <Icon className={treeClasses.treeProductIcon} icon={file} />
              <i className={treeClasses.productName}>{product.name}</i>
            </span>
          </div>
          {this.state.actionButton?
          <div style={{display:'inline'}}>
            <Icon onClick={() => this.actionBoxToggleHandler()} className={[treeClasses.treeActionIcon,classes.treeActionIconOpen].join(' ')} icon={process} width="22" height="22" />
            <div className={classes.actionBox}>
              <Icon
                icon={add} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.addItemModalHandler()
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />
        
              <Icon
                icon={up} 
                className={treeClasses.actionIcons}
                onClick={() => this.props.moveUp(product.id)}
                width="20"
                height="20"
              />
              <Icon
                icon={down} 
                className={treeClasses.actionIcons}
                onClick={() => this.props.moveDown(product.id)}
                width="20"
                height="20"
              />
              <Icon
                icon={cut} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.props.cut(product)
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />
              <Icon
                icon={pencil} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.props.editProductModal(product)
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />
              <Icon
                icon={databaseInfo} 
                className={treeClasses.actionIcons}
                onClick={() => {
                  this.propertiesModalHandler()
                  this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              />
              {cutItem?<Aux>
              <Icon
                icon={copyPaste} 
                className={treeClasses.actionIcons}
                onClick={() => {
                this.pasteCutedItem()
                this.setState({actionBox:false})
                }}
                width="20"
                height="20"
              /></Aux>:null}
            </div>
          </div>:null}
          </div>
            {tree}
          </li>
          </Aux>
  }
}

Product.propTypes = {
  product: PropTypes.object,
  newData: PropTypes.bool,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  editProductModal: PropTypes.func,
  cut: PropTypes.func,
}

export default Product