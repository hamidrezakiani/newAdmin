import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from '../../../axios/AxiosApi'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import store from '../../../store'
const errorHandler = store.getState().errorHandler
class Login extends Component {
  state = {
    phone: null,
    password: null,
    loading: false,
  }
  componentDidMount() {}

  render() {
    let loginButtonContent = this.props.loading ? <CSpinner color="light" /> : 'ورود'
    return (
      <div className="example-appear">
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>ادگستر</h1>
                        <p className="text-medium-emphasis">ورود به پنل ادمین</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="نام کاربری"
                            autoComplete="phone"
                            onChange={(event) =>
                              this.setState({
                                phone: event.target.value,
                              })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="رمز عبور"
                            autoComplete="current-password"
                            onChange={(event) =>
                              this.setState({
                                password: event.target.value,
                              })
                            }
                          />
                          {this.props.wrongPasswordError ? (
                            <CFormFeedback className="d-flex" invalid>
                              {this.props.wrongPasswordError}
                            </CFormFeedback>
                          ) : null}
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={() =>
                                this.props.login(this.state.phone, this.state.password)
                              }
                            >
                              {loginButtonContent}
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0" onClick={() => errorHandler(9)}>
                              فراموشی رمز؟
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loading: PropTypes.bool,
  wrongPasswordError: PropTypes.string,
  login: PropTypes.func,
}

export default Login
