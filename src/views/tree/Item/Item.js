import React, { Component } from 'react'
import treeClasses from '../Tree.module.css'
import Aux from '../../../hoc/Auxx/Auxx'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon/Icon'
import ManageItem from '../../ManageItem/ManageItem'
import {
  acceptItem,
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
  atom,
} from '../../../components/Icon/IconReference'


class Item extends Component {
  
  state = {
   actionBox:false,
   actionButton:true,
   item:{...this.props.item},
   pleasWait:false,
   manageItem:false,
 }
  
 componentDidUpdate(prevProps,prevState){
   if(this.props.item !== prevProps.item)
     this.setState({item:this.props.item,actionBox:false})
   return true;
 }
 
 actionBoxToggleHandler = () => {
   this.setState({actionBox: !this.state.actionBox})
 }
 
 closeManageItem = () => {
   this.setState({manageItem:false})
 }
 
  render(){
    console.log('item')
    let item = this.state.item
    let classes = {
    active: treeClasses.nested,
    caret: treeClasses.caret,
    actionBox:[treeClasses.actionBox,treeClasses.actionClose].join(' '),
    treeActionIconOpen:'',
  }
  
  if(this.state.actionBox){
    classes.actionBox = [treeClasses.actionBox,treeClasses.actionOpen].join(' ')
    classes.treeActionIconOpen = treeClasses.treeActionIconOpen
  }
    return <Aux>
          <ManageItem show={this.state.manageItem} product_id={this.state.item.product_id} item_id={this.state.item.id} close={this.closeManageItem}/>
          {/*this.state.addProductModal?<AddProduct show={true} openTree={() => this.openTree()} product={product} close={this.closeProductAddModal} setProducts={(profucts) => this.setProductsAfterUpdate(profucts)} />:null*/}
          <li className={treeClasses.treeLi}>
          <div className={treeClasses.liContents}>
          <div 
            className={classes.caret}
            onClick={() => this.toggleHandler()}
          >
            <span className={treeClasses.itemSpan}>
              <Icon className={treeClasses.treeItemIcon} icon={acceptItem} />
              <i className={treeClasses.itemName}>{item.name}</i>
            </span>
          </div>
          {this.state.actionButton?
          <div style={{display:'inline'}}>
            <Icon onClick={() => this.actionBoxToggleHandler()} className={[treeClasses.treeActionIcon,classes.treeActionIconOpen].join(' ')} icon={process} width="25" height="25" />
            <div className={classes.actionBox}>
              {/*<FontAwesomeIcon
                icon={solid('plus')} 
                onClick={() => {
                  this.addCategoryModalHandler(category)
                  this.setState({actionBox:false})
                }}
              />*/}
        
              <Icon
                icon={up} 
                onClick={() => this.props.moveUp(item.id)}
                className={treeClasses.actionIcons}
                width="20"
                height="20"
              />
              <Icon
                icon={down} 
                onClick={() => this.props.moveDown(item.id)}
                className={treeClasses.actionIcons}
                width="20"
                height="20"
              />
              <Icon
                icon={cut} 
                onClick={() => {
                  this.props.cut(item)
                  this.setState({actionBox:false})
                }}
                className={treeClasses.actionIcons}
                width="20"
                height="20"
              />
              <Icon
                icon={pencil} 
                onClick={() => {
                  this.props.editItemModal(item)
                  this.setState({actionBox:false})
                }}
                className={treeClasses.actionIcons}
                width="20"
                height="20"
              />
              <Icon
                icon={atom} 
                onClick={() => {
                  this.setState({manageItem:true})
                  this.setState({actionBox:false})
                }}
                className={treeClasses.actionIcons}
                width="20"
                height="20"
              />
              {/*cutCategory?<Aux>
              <FontAwesomeIcon
                icon={solid('paste')} 
                onClick={() => {
                this.pasteCutedCategory(category)
                this.setState({actionBox:false})
                }}
              /></Aux>:null*/}
            </div>
          </div>:null}
          </div>
          </li>
          </Aux>
  }
}

Item.propTypes = {
  item: PropTypes.array,
  cut: PropTypes.func,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  editItemModal: PropTypes.func,
}

export default Item