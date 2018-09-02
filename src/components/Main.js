require('normalize.css/normalize.css');
require('styles/main.css');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
//获取图片相关数据
let imageDatas = require('../data/imageData.json');

//对于只执行一次的函数，可以选择使用自执行函数的方式
//利用自执行函数，将图片信息转换成图片URL路径信息
imageDatas = (function genImgURL(imageDataArr) {
  for (let i = 0; i < imageDataArr.length; i++) {
    let imgData = imageDataArr[i];
    imgData.imgURL = require('../images/' + imgData.fileName);
    imageDataArr[i] = imgData;
  }
  return imageDataArr;
})(imageDatas);

class PhotoGallery extends React.Component {
  render() {
    return (
      <section className={`stage`}>
        <section className={`img-sec`}>
        
        </section>
        <nav className={`controller-nav`}></nav>
      </section>
    );
  }
}

PhotoGallery.defaultProps = {};

export default PhotoGallery;
