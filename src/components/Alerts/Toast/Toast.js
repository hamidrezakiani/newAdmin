import React, { Component } from 'react'
import { CToaster, CToast, CToastBody } from '@coreui/react'
import PropTypes from 'prop-types'

class CustomToast extends Component{
  render(){
    return <CToaster visible={this.props.show} placement="bottom-end">
            <CToast onClose={() => this.props.onClose()} delay={2500} animation={true} autohide={true} visible={this.props.show} color={this.props.type}>
              <CToastBody>
                {this.props.content}
              </CToastBody>
            </CToast>
          </CToaster>
  }
}

CustomToast.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
  content: PropTypes.string
}
export default CustomToast