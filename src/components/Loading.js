import React, { Component } from 'react'
import { CFooter } from '@coreui/react'

class Loading extends Component{
  render(){
    return (
      <div className="loading">
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
      </div>
    )
  }
}

export default React.memo(Loading)
