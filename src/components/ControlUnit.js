/**
 * 控制组件
 */

import React from 'react';
import '../styles/control_unit.css';

class ControlUnit extends React.Component {
  render() {
    return (
      <span className={`control-unit`} onClick={this.handleClick}></span>
    );
  }
  
  //处理控制组件的点击事件
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
}

export default ControlUnit;
