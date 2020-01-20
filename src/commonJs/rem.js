function setRem(mwidth) {
  /*if (document.documentElement.clientHeight < document.documentElement.offsetHeight){
    //console.log(true)
  }else {
    //console.log(false)
  }
  console.log()*/
  //console.log(getScrollWidth)
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  // let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // //得到html的Dom元素
  // let htmlDom = document.getElementsByTagName('html')[0];
  // //设置根元素字体大小
  // htmlDom.style.fontSize = htmlWidth / 20 + 'px';
  let htmlDom = document.getElementsByTagName('html')[0]
  if(mwidth > 1023){
    //console.log(mwidth)
    htmlDom.style.fontSize = (16 * (mwidth / 1680)) + 'px'
    // var route = window.location.pathname
    // if(route == '/rwd/pages/home'){
    //   htmlDom.style.fontSize = '16px'
    // }else{
    //   htmlDom.style.fontSize = (16 * (mwidth / 1680)) + 'px'
    // }
  }else {
    //console.log(20 * (mwidth / 640))
    htmlDom.style.fontSize = (20 * (mwidth / 640)) > 48 ? 30 + 'px' : (16  * (mwidth / 320)) + 'px';
  }
}
function getScrollWidth() {
  var noScroll, scroll, oDiv = document.createElement("DIV");
  oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = "scroll";
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll-scroll;
}
// 初始化
function setFontSize() {
  let mwidth =document.body.clientWidth+getScrollWidth()
  setRem(mwidth)
}
//刷新不需要走滚动条宽度
function setFontSizeRef() {
  let mwidth =document.body.clientWidth
  setRem(mwidth)
}
setFontSizeRef()
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', function () {
  setFontSize()
})
