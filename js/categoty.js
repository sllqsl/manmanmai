$(function(){
//  功能1发送ajax请求，获取数据渲染(大标题)
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcategorytitle',
    data:{},
    dataType:'json',
    type:'get',
    success:function( info ) {
      console.log(info);
      var str = template('tmp',info);
      $('.category_ul').html(str);
    }
  })
 //功能2发送ajax请求，获取数据库(具体项目)
  $('.mm_category').on('click','.tit',function(){
    var self = this;
    //这里的self是点击的tit
    var mData = self.mData || null;
    //在tit上存储一个变量，如果变量存在就不用渲染，直接实现
    console.log(mData);
    if (mData) {
      showHide(self); 
    } else {
      // 如果没有数据的话，就发送ajax请求获取数据渲染
      $.ajax({
        url:'http://127.0.0.1:9090/api/getcategory',
        data:{
          titleid:$(this).attr('titleId')
        },
        dataType:'json',
        type:'get',
        success:function( info ) {
          console.log(info);
          var str = template('tmp1',info);
          self.mData = info;
          // 把info数据赋值给mData
          // 此时mData就是有数据的，说明已经渲染过了
          $(self).siblings('.info').html(str);
          showHide(self);
        }
      })
    }
  })
//  功能3展示和隐藏功能
    function showHide(self) {
      $(self).siblings('.info').slideToggle(200).parent().siblings('.category_li').
      children('.info').slideUp(200);
    }
})