import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://adgostar.net" target="_blank" rel="noopener noreferrer">
          
        </a>
        <span className="ms-1"></span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://adgostar.net" target="_blank" rel="noopener noreferrer">
          adgostar
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
