import React from 'react';

import '../styles/img_figure.css'

class ImgFigure extends React.Component {
  render() {
    const {data, pos} = this.props;
    return (
      <figure className={`img-figure`} style={{...pos}}>
        <img src={data.imgURL} alt={data.title}/>
        <figcaption><h2 className={`img-title`}>{data.title}</h2></figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
