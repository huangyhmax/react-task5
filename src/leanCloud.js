import AV from 'leancloud-storage';

var APP_ID = '5oIHS8kmV9p9WIpV5ibIvHfI-gzGzoHsz';
var APP_KEY = 'RTtV0nLCJ7yJBxVQv8K9H0vr';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV 

export const TodoModel = {
  getByUser(user, successFn, errorFn){
    // let query = new AV.Query('AllMessages')
    let optionone=new AV.Query('AllMessages')
    let optiontwo=new AV.Query('AllMessages')
    optionone.equalTo('deleted', false)
    optiontwo.equalTo('deleted', true)
    // optionone=query.equalTo('deleted',false)
    // optiontwo=query.equalTo('deleted',true)
    let query=AV.Query.or(optionone,optiontwo)
    query.find().then((response) => {
      let array = response.map((t) => {
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },
  create({status, title, deleted}, successFn, errorFn){
    // let Todo = AV.Object.extend('Todo')
    let AllMessages=AV.Object.extend('AllMessages')
    let msgcontent= new AllMessages()

    msgcontent.set('title', title)
    msgcontent.set('status', status)
    msgcontent.set('deleted', deleted)

    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    msgcontent.setACL(acl);
    
    msgcontent.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  },
  update({id, title, status, deleted}, successFn, errorFn){
    
    // let todo = AV.Object.createWithoutData('Todo', id)
    let toDoThings = AV.Object.createWithoutData('AllMessages', id)
    title !== undefined && toDoThings.set('title', title)
    status !== undefined && toDoThings.set('status', status)
    deleted !== undefined && toDoThings.set('deleted', deleted)
    toDoThings.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },
  destroy(toDoThingsId, successFn, errorFn){
    // let toDoThings = AV.Object.createWithoutData('AllMessages', toDoThingsId)
    // toDoThings.destroy().then(function (response) {
    //   successFn && successFn.call(null)
    // }, function (error) {
    //   errorFn && errorFn.call(null, error)
    // });
    TodoModel.update({id: toDoThingsId, deleted: true}, successFn, errorFn)
  },
  getback(toDoThingsId, successFn, errorFn){
    TodoModel.update({id: toDoThingsId, deleted: false}, successFn, errorFn)
  }
}

export function signUp(email, username, password, successFn, errorFn){
   // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}


function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

export function sendPasswordResetEmail (email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}
// export function signIn(username, password){
//     AV.User.logIn(username, password).then(function (loginedUser) {
//         // <UserDialog: null/>
//     }, function (error) {
//         alert(JSON.stringify(error));
//     });
// }


export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}


// export function setData({id, title, status, deleted}, successFn, errorFn){

//   // var testData = AV.Object.extend('TestData');
//   // var testData2=new testData();
//   let testData2 = AV.Object.createWithoutData('TestData2', id)
//   // testData2.set('id', id);
//   testData2.set('title', title);
//   testData2.set('status', status);
//   testData2.set('deleted', deleted);
//   // console.log(AV.User.current());
//   // testData2.set('owner', owner);

//   testData2.save().then(function(testData2) {
//     successFn && successFn.call(null)
//     console.log(1)
//     console.log('objectId is ' testData2.id);
//   }, function(error) {
//     errorFn && errorFn.call(null, error)
//   });
// }

