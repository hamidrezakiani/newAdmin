import React, {Component} from 'react'
import './PleasWait.css'
import Aux from '../../../hoc/Auxx/Auxx'
class PleasWait extends Component {
  render(){
    return <div className="pleas-wait">
            <div className="content">لطفا صبر کنید...</div>
            <div className="backdore"></div>
          </div>
  }
}

export default PleasWait