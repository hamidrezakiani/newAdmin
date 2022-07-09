import React,{Component} from 'react'
import Aux from '../../../hoc/Auxx/Auxx'
import SubCategory from './SubCategory/SubCategory'
import PropTypes from 'prop-types';
class Category extends Component {
  render(){
    //console.log(this.props.subCat.length)
    let content = null;
    if(this.props.subCat.length != 0)
      content = <SubCategory subCat={this.props.subCat} />
    return <div className="wrapper2">
             <span className="label-cat">{this.props.name}</span>
             {content}
          </div>
  }
}

Category.propTypes = {
  subCat: PropTypes.array,
  name: PropTypes.string
}
export default Category