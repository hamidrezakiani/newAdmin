import React,{Component} from 'react'
import PropTypes from 'prop-types';
class Product extends Component {
  render(){
    let classes = {}
    if(this.props.products.length > 1)
    {
      classes = {entry:'entry product',branch:'branch'}
    }
    else
    {
      classes = {entry:'entry-single product',branch:'branch-single'}
    }
    let content = this.props.products.map(pro => {
      let items = null;
     // if(cat.count_product == 0)
   //   {
    //  if(cat.subCats.categories.length != 0)
  //      subCat = <SubCategory subCat={cat.subCats.categories} />
//      }
      return <div key={pro.id} className={classes.entry}>
                  <span className="label-product">{pro.name}</span>
                  {items} 
             </div>
    })
    return <div className={classes.branch}>
               {content}
            </div>
  }
}

Product.propTypes = {
  products: PropTypes.array,
}
export default Product