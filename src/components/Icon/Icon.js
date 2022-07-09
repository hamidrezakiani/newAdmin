import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Icon extends Component{
  render() {
   return <img 
            src={this.props.icon}
            className={this.props.className}
            width={this.props.width}
            height={this.props.height}
            onClick={() => this.props.onClick()}
            />
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
}

export default Icon
