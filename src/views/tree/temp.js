import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'



import treeClasses from '../Tree.module.css'
//<FontAwesomeIcon icon={solid('coffee')} />
class Category extends Component {
 
 state = {
   open: false,
   actionBox:false,
   categories:null,
 }
 
 componentDidMount(){
    if(!this.state.categories)
      this.setState({categories:this.props.cat});
  }
 
 toggleHandler = () => {
   this.setState({open: !this.state.open})
 }
 
 actionBoxToggleHandler = () => {
   this.setState({actionBox: !this.state.actionBox})
 }
 render(){
   //icons
   if(this.state.categories){
   const faUser = findIconDefinition({iconName: 'user'})
   let category = [...this.state.categories]
   let products = this.products;
   let subCategories = category.subCats
   let tree = null
   if(category.count_subCat)
     tree = subCategories.categories.map(cat => {
       return <Category key={cat.id} category={cat} />
     })
  let classes = {
    active: treeClasses.nested,
    caret: treeClasses.caret,
    open:'',
    actionBox:[treeClasses.actionBox,treeClasses.actionClose].join(' '),
  }
  if(this.state.open){
    classes.active = treeClasses.active
    classes.caret = treeClasses.caretDown
    classes.open = treeClasses.open
  }
  
  if(this.state.actionBox){
    classes.actionBox = treeClasses.actionBox
  }
  if(tree != null)
    tree = <ul className={[classes.active , treeClasses.treeUl].join(' ')}>{tree}</ul>
    
   return <li className={treeClasses.treeLi}>
          <div className={treeClasses.liContents}>
          <div 
            className={classes.caret}
            onClick={() => this.toggleHandler()}
          >
            <span className={[classes.open , treeClasses.treeSpan].join(' ')}>
              <FontAwesomeIcon className={treeClasses.treeCategoryIcon} icon={regular('folder-open')} />
              <i className={treeClasses.treeI}>{category.name}</i>
            </span>
          </div>
          <div style={{display:'inline'}}>
            <FontAwesomeIcon onClick={() => this.actionBoxToggleHandler()} className={treeClasses.treeActionIcon} icon={solid('pencil')} />
            <div className={classes.actionBox}>
              <FontAwesomeIcon icon={solid('arrow-up')} />
              <i className="fa fa-arrow-down">2</i>
              <i className="fa fa-copy">3</i>
              <i className="fa fa-plus">4</i>
              <i className="fa fa-close">5</i>
              <i className="fa fa-pencil">6</i>
            </div>
          </div>
          </div>
            {tree}
          </li>
   }
 } 
 
}

export default Category