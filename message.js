!function (){
    var view = document.querySelector('section.message');

    var model = {
        //获取数据
        init: function (){
            var APP_ID = 'OUIULErUeTT6WMWBGT5jOjkD-gzGzoHsz';
            var APP_KEY = '9BS9wfLwXryrejIJp6ttVC13';
            
            AV.init({
              appId: APP_ID,
              appKey: APP_KEY
            });
        },
        fetch: function(){
            var query = new AV.Query('message');
            return query.find();
        },
        //创建数据
        save: function(user,content){
            var Message = AV.Object.extend('message');
            var message = new Message();
            return message.save({
                content: content,
                user: user
            })
        }
    }

    var controller = {
        view: null,
        nodel: null,
        messageList: null,
        form: null,
        init: function (view,model){
            this.view = view;
            this.model = model;
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.model.init();
            this.loadMessages();
            this.bindEvents();
        },
        loadMessages: function (){
            this.model.fetch().then(
                (messages)=> {
                    let array = messages.map((item)=> item.attributes);
                    array.forEach((item)=>{
                    let li = document.createElement('li');
                    li.innerText = `${item.user}:${item.content}`;
                    this.messageList.appendChild(li);
                })
            }).then(function(todos) {
              // 更新成功
            }, function (error) {
              // 异常处理
            });
        },
        bindEvents: function (){
            
            this.form.addEventListener('submit', (e)=>{//注意此处使用箭头函数，否则找不到saveMessage
                e.preventDefault();
                this.saveMessage();
            })
        },
        saveMessage: function (){
            let myForm = this.form;
            let content = myForm.querySelector('input[name=content]').value;
            let user = myForm.querySelector('input[name=user]').value;
            this.model.save(user,content).then(function(object){
                let li = document.createElement('li');
                li.innerText = `${object.attributes.user}:${object.attributes.content}`;
                let messageList = document.querySelector('#messageList');
                messageList.appendChild(li);
                myForm.querySelector('input[name=content]').value = '';
            })
        }
    }
    controller.init(view,model)
}.call()







/*
//创建TestObject表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
//数据内容是hello world 保存
//如果保存成功，则运行alert
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/