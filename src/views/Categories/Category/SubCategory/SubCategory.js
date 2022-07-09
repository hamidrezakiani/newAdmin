import React,{Component} from 'react'
import Product from '../../Product/Product'
import PropTypes from 'prop-types';
class SubCategory extends Component {
  render(){
    let classes = {}
    if(this.props.subCat.length > 1)
    {
      classes = {entry:'entry',branch:'branch'}
    }
    else
    {
      classes = {entry:'entry-single',branch:'branch-single'}
    }
    let content = this.props.subCat.map(cat => {
      let subCat = null;
      let products = null;
      if(cat.count_product == 0)
      {
      if(cat.subCats.categories.length != 0)
        subCat = <SubCategory subCat={cat.subCats.categories} />
      }
      else
      {
        products =  <Product products={cat.products} />
      }
      return <div key={cat.id} className={classes.entry}>
                  <span className="label-cat">{cat.name}</span>
                  {subCat} 
                  {products}
             </div>
    })
    return <div className={classes.branch}>
               {content}
            </div>
  }
}

SubCategory.propTypes = {
  subCat: PropTypes.array,
}
export default SubCategory