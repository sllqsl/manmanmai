$(function(){
// 功能1发送ajax请求，获取数据，渲染导航
var titleid = getSearch('titleid')||0;
$.ajax({
 url:'http://127.0.0.1:9090/api/getbaicaijiatitle',
 data:{},
 dataType:'json',
 type:'get',
 success:function( info ) {
   console.log(info);
   var str = template('tmp',info);
   $('.ul-wapper ul').html(str);
   var titleLi = $('.bcj-title').find('.ul-wapper li');
   console.log(titleLi);
  //  功能2点击出现下边框
   $(titleLi[titleid || 0]).addClass('active');
   topSwipe($('.bcj-title').find('.ul-wapper ul'),titleid);
 }
})
$.ajax({
  url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
  data:{
    titleid:titleid
  },
  dataType:'json',
  type:'get',
  success:function( info ) {
    console.log(info);
    var str = template('tmp1',info);
    $('.bcj-list ul').html(str);
    
  }
})
// 功能3实现区域滚动

// 原生区域滚动
function topSwipe(dom, titleid) {
  var domWidth = dom.width();
  var domParentWidth = dom.parent().width();
  var buffer = 50;
  var maxPosition = 0;
  var minPosition = domParentWidth - domWidth;
  var maxSwipe = 0 + buffer;
  var minSwipe = minPosition - 50;
  var startX = 0;
  var moveX = 0;
  var endX = 0;
  var distanceX = 0;
  var currentX = 0;
  var li = dom.find('li');
  for (var i = 0; i < titleid; i++) {
      currentX -= $(li[i]).width();
  }
  if (currentX < minPosition) {
      currentX = minPosition
  } else if (currentX > maxPosition) {
      currentX = maxPosition;
  }
  addTransition(dom);
  setTranslateX(dom, currentX)
  dom[0].addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
  });
  dom[0].addEventListener('touchmove', function(e) {
      moveX = e.touches[0].clientX;
      distanceX = moveX - startX;
      // removeTransition(dom);
      if ((currentX + distanceX) > minSwipe && (currentX + distanceX) < maxSwipe) {
          // console.log(currentX + distanceX);
          addTransition(dom);
          setTranslateX(dom, (currentX + distanceX));
      }
  });
  dom[0].addEventListener('touchend', function(e) {
      // endX = e.changedTouches[0].;
      if ((currentX + distanceX) > maxPosition) {
          currentX = maxPosition;
          addTransition(dom);
          setTranslateX(dom, currentX);
      }
      //小于最小定位的时候
      else if ((currentX + distanceX) < minPosition) {
          currentX = minPosition;
          addTransition(dom);
          setTranslateX(dom, currentX);
      } else {
          //记录当前滑动完成后的定位
          currentX = currentX + distanceX;
      }
  });

  function addTransition(dom) {
      dom.css('transition', "all 0.2s");
  }

  function removeTransition(dom) {
      dom.css('transition', "none");
  }

  function setTranslateX(dom, x) {
      dom.css('transform', "translateX(" + x + "px)");
  }
}
// 专门通过传递的参数, 可以解析出地址栏的参数值
function getSearch( name ) {
  var search = location.search; // ?name=pp&age=18&desc=%E5%B8%85

  // 解码成中文
  search = decodeURI( search ); // ?name=pp&age=18&desc=帅

  // 将 ? 去掉
  search = search.slice(1);  // name=pp&age=18&desc=帅

  // 根据 & 进行切割
  var arr = search.split( "&" );  // ["name=pp", "age=18", "desc=帅"]
  var obj = {};
  arr.forEach(function( v, i ) {  // v 就是每一项, ["name=pp"]
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  return obj[name];
}
})