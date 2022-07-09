import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import PropTypes from 'prop-types'
import Loading from './Loading'
// routes config
import routes from '../routes'

const AppContent = (props) => {
  return (
    <CContainer style={{overflow:'scroll'}} lg>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element errorHandler={(err) => props.errorHandler(err)}/>}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}
AppContent.propTypes = {
  errorHandler: PropTypes.func,
}
export default React.memo(AppContent)
