import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import axios from './axios/AxiosApi'
import { CSpinner } from '@coreui/react'
import store from './store';
import PleasWait from './components/Alerts/PleasWait/PleasWait'
import CToast from './components/Alerts/Toast/Toast'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
class App extends Component {
  state = {
    isLogin: false,
    signingIn: false,
    api_token: null,
    wrongPasswordError: null,
    person: null,
    pleasWait:false,
    toast:{
      show:false,
      content:null,
      type:null,
    }
  }
  
  checkingLogin = false
  loginHandler = (_phone, _password) => {
    this.setState({ wrongPasswordError: null })
    this.setState({ signingIn: true })
    axios
      .post('/login', {
        phone: _phone,
        password: _password,
      })
      .then((response) => {
        this.setState({ signingIn: false })
        console.log(response)
        let data = response.data.data
        this.setState({
          person: {
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
          },
          isLogin: true,
          api_token: data.api_token,
        })
        localStorage.setItem('api_token', data.api_token)
      })
      .catch((response) => {
        this.setState({ signingIn: false })
        if (response.response.status == 401) {
          this.setState({
            wrongPasswordError: response.response.data.errors.email[0],
          })
        }
      })
  }
  checkaLoginHandler = () => {
    this.checkingLogin = true
    this.setState({ api_token: localStorage.getItem('api_token')})
    axios
      .get('/account')
      .then((response) => {
        this.checkingLogin = false
        this.setState({ isLogin: true })
      })
      .catch((response) => {
        this.checkingLogin = false
        localStorage.removeItem('api_token')
        this.setState({ api_token: null})
      })
  }
  toastHandler = (c=null,t=null) => {
    this.setState({toast:{
      show:!this.state.toast.show,
      content:c,
      type:t,
    }})
  }
  errorHandler = (err) => {
    alert(err)
  }
  
  
  render() {
    store.dispatch({type: 'set',errorHandler:(err) => this.errorHandler(err)})
    store.dispatch({type: 'set',pleasWait:(status) => this.setState({pleasWait:status})})
    store.dispatch({type: 'set',toastMessages:(c,t) => this.toastHandler(c,t)})
    if (!this.checkingLogin && !this.state.isLogin && localStorage.getItem('api_token')) {
      this.checkaLoginHandler()
    }
    let content = this.checkingLogin ? (
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
    ) : (
      
      <HashRouter>
        {this.state.pleasWait?<PleasWait />:null}
        <CToast content={this.state.toast.content}
                type={this.state.toast.type}
                show={this.state.toast.show}
                onClose={() => this.toastHandler()}/>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={
                this.state.isLogin ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login
                    wrongPasswordError={this.state.wrongPasswordError}
                    loading={this.state.signingIn}
                    login={this.loginHandler}
                    errorHandler={this.errorHandler}
                  />
                )
              }
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              element={!this.state.isLogin ? <Navigate to="/login" replace /> : <DefaultLayout errorHandler={this.errorHandler} />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
    return content
  }
}

export default App
