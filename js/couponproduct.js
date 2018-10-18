$(function(){
  // 功能1：发送ajax请求获取数据渲染
  var couponid = getSearch('couponid');
  console.log(couponid);
  render();
  function render(){
    $.ajax({
      url:'http://127.0.0.1:9090/api/getcouponproduct',
      data:{
       couponid:couponid
      },
      dataType:'json',
      type:'get',
      success:function( info ) {
        console.log(info);
        var str = template('tmp',info);
        $('.coupon-list ul').html(str);
      }
    })
  }
 //  功能2：点击优惠券出现录播图轮播
   $('.coupon-list').on('click','li',function(){
     $('.modal').show();
     //点击出现模态框
    //  render();
     //  console.log($(this).children().children('.pic').children()[0]);
     var str = $(this).children().children('.pic').children()[0];
     console.log(str);
     
     //点击当前的图片标签
     var arr =[];
     var index;
     var $li = $(this);
     var newArr = Array.prototype.slice.call($('.coupon-list li'));
     console.log(newArr);
     newArr.forEach(function(v,i){
      //  console.log($(v));
       arr.push($(v).children().children('.pic').children()[0].outerHTML);
      //  console.log(arr);
     })
     index = $(this).attr('couponProductId');

     //点击下一张图片标签
     $('.img').html(arr[index]);
     render();
     //点击切换图片
     $('.arr-left').click(function(){
       index--;
       if (index <0) {
         index = arr.length -1;
         $('.img').html(arr[index]);
         render();
       }
       $('.img').html(arr[index]);
       render();
     })
     $('.arr-right').click(function(){
       index++;
       if (index > arr.length -1) {
        $('.img').html(arr[index]);
        render();
       }
       $('.img').html(arr[index]);
       render();
     })
    $('.img').click(function(){
      $('.modal').hide();
      //点击取消模态框
      $(document).scrollTop(125*index); 
    })
   })
 
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