import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import PropTypes from 'prop-types'
const DefaultLayout = (props) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent errorHandler={(err) => props.errorHandler(err)}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  errorHandler: PropTypes.func,
}
export default DefaultLayout
