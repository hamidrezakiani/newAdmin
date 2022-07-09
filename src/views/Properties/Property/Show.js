import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Aux from '../../../hoc/Auxx/Auxx'

class Show extends Component {
  
  render() {
    return <Aux>
             <p>
            <strong className="ml-25">
              نام فیلد :    
            </strong>
            <span>
             {this.props.property.label}
            </span>
          </p>
          <p>
            <strong className="ml-25">
              نام ترکی فیلد :    
            </strong>
            <span>
             {this.props.property.turkish_label}
            </span>
          </p>
          <p>
            <strong className="ml-25">
              پلیس هولدر :    
            </strong>
            <span>
             {this.props.property.placeholder}
            </span>
          </p>
          <p>
            <strong className="ml-25">
               پلیس هولدر ترکی :    
            </strong>
            <span>
             {this.props.property.turkish_placeholder}
            </span>
          </p>
          <p>
            <strong className="ml-25">
              راهنما :    
            </strong>
            <span>
             {this.props.property.tooltip}
            </span>
          </p>
          <p>
            <strong className="ml-25">
              راهنما ترکی :    
            </strong>
            <span>
             {this.props.property.turkish_tooltip}
            </span>
          </p>
          <p>
            <strong className="ml-25">
              حداقل سایز :    
            </strong>
            <span>
             {this.props.property.minSize} <strong>{this.props.property.sizeUnit}</strong>
            </span>
          </p>
          <p>
            <strong className="ml-25">
              حداکثر سایز :    
            </strong>
            <span>
             {this.props.property.maxSize} <strong>{this.props.property.sizeUnit}</strong>
            </span>
          </p>
          <p>
            <strong className="ml-25">
              اجباری :    
            </strong>
            <span>
             {this.props.property.required=='YES'?'بله':'خیر'}
            </span>
          </p>
           </Aux>
  } 
}

Show.propTypes = {
  property:PropTypes.object,
}

export default Show