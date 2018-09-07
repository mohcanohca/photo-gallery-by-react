require('normalize.css/normalize.css');
require('styles/main.css');

import React from 'react';
import {findDOMNode} from 'react-dom';
import ImgFigure from './ImgFigure';
import ControlUnit from './ControlUnit';

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

//获取一个[low,high]范围中的随机值
function getRandomValue(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

//获取一个[-30°,30°]的随机值
function get30DegRotation() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
}

class PhotoGallery extends React.Component {
  state = {
    imgsArrangeArr: [
      /*{
        pos: {//位置
          left: 0,
          top: 0
        },
        rotation: 0,//旋转角度
        isInverse: false,//是否翻转
        isCenter: false,//是否位于中心
      }*/
    ]//存储所有图片排布位置的取值范围
  };
  
  Constant = {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: {//水平方向的取值范围，
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {//垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  };
  
  //组件加载后，为每张图片计算其位置的范围
  componentDidMount() {
    this.setPosArranges();
    this.rearrange(0);
  }
  
  render() {
    let controlUnits = [];//存储控制按钮
    let imgFigures = [];//存储图片流
    const {imgsArrangeArr} = this.state;
    imageDatas.forEach((current, index) => {
      if (!imgsArrangeArr[index]) {
        //若该图片对应的取值范围不存在，初始化其取值范围
        imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotation: 0,
          isInverse: false,
          isCenter: false
        }
      }
      
      imgFigures.push(
        <ImgFigure key={index}
                   data_state={imgsArrangeArr[index]}
                   data={current}
                   ref={'imgFigure' + index}
                   inverse={this.inverse(index)}
                   center={this.center(index)}/>);
      
      controlUnits.push(<ControlUnit key={index}
                                     data_state={imgsArrangeArr[index]}
                                     inverse={this.inverse(index)}
                                     center={this.center(index)}/>);
      
      return current;
    });
    
    return (
      <section className={`stage`} ref={`stage`}>
        <section className={`img-sec`}>
          {imgFigures}
        </section>
        
        <nav className={`control-nav`}>
          {controlUnits}
        </nav>
      </section>
    );
  }
  
  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪张图片
   */
  rearrange = (centerIndex) => {
    const {imgsArrangeArr} = this.state;
    const Constant = this.Constant;
    
    //取出图片布局的总分布对象
    let hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      centerPos = Constant.centerPos;
    
    //取出左右两侧的图片布局取值范围
    let leftSecX = hPosRange.leftSecX,
      rightSecX = hPosRange.rightSecX,
      y = hPosRange.y;
    
    //取出上侧的图片布局取值范围
    let topY = vPosRange.topY,
      x = vPosRange.x;
    
    //设置中间图片的位置
    let centerImgArrangeArr = imgsArrangeArr.splice(centerIndex, 1);//splice修改原数组，返回删除的元素组成的数组
    centerImgArrangeArr[0] = {
      pos: centerPos,
      rotation: 0,
      isInverse: false,
      isCenter: true
    };
    
    //设置上侧区域图片的状态信息
    let topImgCount = Math.round(Math.random());//上侧区域图片取0张或1张
    let topImgSpliceIndex = 0;
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgCount));
    
    //设置上侧区域图片的取值范围
    let topImgArrangeArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgCount);
    for (let i = 0; i < topImgArrangeArr.length; i++) {
      topImgArrangeArr[i] = {
        pos: {
          left: getRandomValue(x[0], x[1]),
          top: getRandomValue(topY[0], topY[1])
        },
        rotation: get30DegRotation(),
        isInverse: false,
        isCenter: false
      };
    }
    
    
    //设置左右两侧区域的图片状态
    let length = imgsArrangeArr.length;
    for (let i = 0; i < imgsArrangeArr.length; i++) {
      let secX = [];
      
      if (i < length / 2) {
        secX = leftSecX;
      } else {
        secX = rightSecX;
      }
      
      imgsArrangeArr[i] = {
        pos: {
          left: getRandomValue(secX[0], secX[1]),
          top: getRandomValue(y[0], y[1])
        },
        rotation: get30DegRotation(),
        isInverse: false,
        isCenter: false
      }
    }
    
    //将中间的图片和上侧的图片放回图片布局状态数组
    imgsArrangeArr.splice(centerIndex, 0, centerImgArrangeArr[0]);
    if (topImgArrangeArr && topImgArrangeArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, topImgArrangeArr[0]);
    }
    
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  };
  
  //设置上下左右区域图像能放置的位置范围
  setPosArranges = () => {
    //首先获取舞台的大小
    let stageDOM = findDOMNode(this.refs.stage);
    let stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),//Math.ceil向上取证
      halfStageH = Math.ceil(stageH / 2);
    
    //获取一个imgFigure的大小
    let imgFigureDOM = findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
    
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH * 2,
      zIndex: 10
    };
    
    //设置左右两侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    
    //设置上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 4;//本来应该*3，但为了和中间区域的图像保持不重叠，随中间区域对象向上调整了半个图像高
  };
  
  /**
   * 翻转
   * @param index 要翻转的图片在图片布局数组中的index
   * @return 闭包 返回一个预制好在图片布局数组中对应的index的函数
   */
  inverse = (index) => {
    return (function () {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }).bind(this);
  };
  
  /**
   * 置中
   * @param index 将图片布局数组中的第index个图片布局状态设置为居中
   * @return 闭包 返回一个预制好在图片布局数组中对应的index的函数
   */
  center = (index) => {
    return (function () {
      this.rearrange(index);
    }).bind(this);
  };
}

PhotoGallery.defaultProps = {};

export default PhotoGallery;
