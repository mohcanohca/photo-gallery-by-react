import React from 'react';

import '../styles/img_figure.css'

class ImgFigure extends React.Component {
  render() {
    const {data, data_state} = this.props;
    let styleObj = {
      ...data_state.pos
    };
    
    let prefixers = ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'];
    
    if(data_state)
    //为tranform属性添加厂商前缀
    prefixers.forEach((cur) => {
      styleObj[cur] = 'rotate(' + data_state.rotation + 'deg)';
    });
    
    return (
      <figure className={`img-figure`} style={styleObj}>
        <img src={data.imgURL} alt={data.title}/>
        <figcaption><h2 className={`img-title`}>{data.title}</h2></figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
