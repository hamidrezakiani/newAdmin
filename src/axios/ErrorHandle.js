import React from 'react'
import { connect } from "react-redux"
import store from '../store'
import {loginModalToggle,userDropdownToggle} from '../actions/siteActions'
import {logout} from '../actions/authActions'


class ErrorHandle {
  
  setError(error){
    this.error = error
    return this
  }
  
  handle(){
    //console.log(site)
    switch (this.error.status) {
      case 401:
        this.logoutActions()
        break
      case 403:
        break
      case 404:
        break
      case 500:
        break
      default:
        break
    }
  }
  
  logoutActions(){
    //let site = store.getState().site.site
    //if(!site.loginModal)
      //store.dispatch(loginModalToggle())
    //store.dispatch(logout()) 
    //localStorage.removeItem('user')
  }
}

const mapStateToProps = state => ({
  songs: state.songs,
})

export default ErrorHandle