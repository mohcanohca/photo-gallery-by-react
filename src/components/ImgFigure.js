import React from 'react';

import '../styles/img_figure.css'

class ImgFigure extends React.Component {
  render() {
    const {data, data_state, inverse} = this.props;
    let styleObj = {
      ...data_state.pos
    };
    
    let prefixers = ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'];
    
    if (data_state.rotation !== 0)
    //为tranform属性添加厂商前缀
      prefixers.forEach((cur) => {
        styleObj[cur] = 'rotate(' + data_state.rotation + 'deg)';
      });
    
    /*
     * 居中图片z-index高于旁边的图片，低于controller-nav的。取11的一次方
     */
    if (data_state.isCenter) {
      styleObj.zIndex = 11;
    }
    
    
    let imgFigureClassName = 'img-figure';
    imgFigureClassName += data_state.isInverse ? ' is-inverse' : '';
    
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={data.imgURL} alt={data.title}/>
        <figcaption>
          <h2 className={`img-title`}>{data.title}</h2>
          <div className={`img-back`}>
            <p>{data.description}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
  
  handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.data_state.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    
  }
}

export default ImgFigure;
