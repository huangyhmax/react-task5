import AV from 'leancloud-storage';

var APP_ID = '5oIHS8kmV9p9WIpV5ibIvHfI-gzGzoHsz';
var APP_KEY = 'RTtV0nLCJ7yJBxVQv8K9H0vr';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV 

export function setData(id,title,status,deleted,owner){
  var product = new Product();
  product.set('id', id);
  product.set('title', title);
  product.set('status', status);
  product.set('deleted', deleted);
  product.set('owner', owner);

  product.save().then(function() {
    // window.location.href = "./../products-list/products-list.html";
    //开始展示数据，写展示数据的函数
    console.log(1)
  }, function(error) {
    alert(JSON.stringify(error));
  });
}

// {
//     id: idMaker(),
//     title: event.target.value,
//     status: null,
//     deleted: false
// }