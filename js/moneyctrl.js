$(function(){
 var pageid = getSearch('pageid')||0;
 render();
 function render(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getmoneyctrl',
    data:{
      pageid:pageid
    },
    dataType:'json',
    type:'get',
    success:function( info ) {
      console.log(info);
      var str = template('tmp',info);
      $('.product_list').html(str);  
      var href = location.href.split('?')[0]; // 获取当前页面 url
       /* 默认参数 */
       var base = {
         pageNum : Math.ceil(info.totalCount/info.pagesize),     // 总共几页，不传默认置为 1
         pageVal : 'pageid',     // 控制页面切换的参数,不传默认使用 pageid，根据 pageid 切页
         start : 1,       // 参数从几 开始传 默认为 1
         pageUrl : href,  // 不赋值默认为当前页面  xxx.html?pageVal
         extraStr: ''     // 默认为空，额外需要传在 url 中的值  &name=123...
     };
        // 解析 search 获取参数 对象  pageid=x
        var o = {}; o[base.pageVal] = base.start;   // 初始化参数 { base.pageVal=base.start }
        var urlObj = location.search ? query( location.search ) : o;
        var pageid = parseInt( urlObj[base.pageVal] || base.start ) ;
  
        /* 获取元素节点 */
        var $btlast = $('.fenye_first'); // 上一个页面
        var $btnext = $('.fenye_last'); // 下一个页面
        var $select = $('.fenye_select'); // select 标签
            /*------  添加功能 ------*/
            if ( !isNaN( +base.pageNum ) && !isNaN( +pageid ) ) {
              // 上一页功能
              pageid <= base.start ? $btlast.attr('href','javascript:;') : ( $btlast.attr('href', base.pageUrl + '?' + base.pageVal + '='+(pageid-1) + base.extraStr ) );
              // 下一页功能
              pageid >= (base.start + base.pageNum - 1) ? $btnext.attr('href','javascript:;') : ( $btnext.attr('href', base.pageUrl + '?' + base.pageVal + '='+(pageid+1) + base.extraStr ) );
  
              /*  select option 选择跳转功能  */
              $select.html('');   // 清空
              /* 添加 option */
              for ( var i = 1; i <= base.pageNum; i++ ) {
                  var option = document.createElement('option');
                  option.value = i + base.start - 1;  // 从 1 + start - 1 开始
                  option.innerHTML =  i  + ' / ' + base.pageNum;
                  /* 设置 底部选中的 option */
                  if( i == ( pageid - base.start + 1 ) ) option.selected = true;
                  $select.append( option );
              }
              /* 选中 option 切换到对应页面 */
              $select.on('change',function() {
                  location.href = base.pageUrl +  '?' + base.pageVal + '=' + $select[0]['value'] + base.extraStr;
           });
        }
    }
  })
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
//获取地址对象
 function query( url ) {
  var obj = {};
  var str = url.split('?')[1];
  str.split('&').forEach(function( v, i ) {
      var arr = v.split('=');
      obj[arr[0]] = arr[1] ? arr[1] : '';
  });
  return obj;
}
})