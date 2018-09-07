/**
 * 控制组件
 */

import React from 'react';
import '../styles/control_unit.css';

class ControlUnit extends React.Component {
  render() {
    let controlUnitClassName = 'control-unit';
    const {data_state} = this.props;
    
    if (data_state.isCenter) {
      controlUnitClassName += ' is-center';
    }
    
    if (data_state.isInverse) {
      controlUnitClassName += ' is-inverse';
    }
    
    return (
      <span className={controlUnitClassName} onClick={this.handleClick}></span>
    );
  }
  
  //处理控制组件的点击事件
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const {data_state, inverse, center} = this.props;
    if (data_state.isCenter) {
      inverse();
    } else {
      center();
    }
  }
}

export default ControlUnit;
