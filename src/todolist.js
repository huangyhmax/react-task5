/*JSX写todolist*/

import React,{Component} from 'react';
import {render} from 'react-dom';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
// import * as localStorage from './localStorage';
import './todolist.css';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut,TodoModel} from './leanCloud';
import DelTodoItem from './deletetodo';
// import {setData} from './Storage';




// const TodoContainer=document.getElementById('container');

export default class Listtodo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: getCurrentUser() || {},
            newTodo:'',
            add:'',
            todoList:[
                // {id:1,title:'test'},
                // {id:2,title:'test2'},
                // {id:3,title:'test3'},
                // {id:4,title:'test4'},
            ]
        }
    }
            // todoList:localStorage.load('todoList') || []
    initialtodolist(){
        let currentuser = getCurrentUser()
        TodoModel.getByUser(currentuser, (todos) => {
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.todoList = todos
            this.setState(stateCopy)
        })
        
    }

    componentWillMount(){
        let currentuser = getCurrentUser()
        if (currentuser) {
            this.initialtodolist.call(this);
        }
    }
        
    render(){
        
        // let todos=this.state.todoList.map((item,index)=>{
        let todos = this.state.todoList
        .filter((item)=> !item.deleted)
        .map((item,index)=>{
            return (
                // <li>
                // <input type="checkbox" className="chexb"/>
                // <input type="text" className="listcxt" value={item.title} />
                // <span className="delicon">x</span>
                // </li>
            
                <TodoItem 
                    todos={item} 
                    onToggle={this.toggle.bind(this)}
                    onDelete={this.delete.bind(this)}
                />
            )        
        })
        let deletetodos=this.state.todoList
        .filter((item)=>item.deleted).map((item,index)=>{
            return (<DelTodoItem todos={item}
            onGetback={this.taketodoback.bind(this)}
            />)
        }
        )
        let mainpanel=(
            <div>
                <h1>{this.state.user.username||'My '} To do List
                {this.state.user.id ? <button className="loginout" onClick={this.onsignOut.bind(this)}>退出登录</button> : null}
                </h1>
                <TodoInput content={this.state.newTodo} 
                    onChange={this.changeTitle.bind(this)}
                    onSubmit={this.addTodo.bind(this)} />
                <ul className="items">
                    {todos}
                </ul>
            </div>
        )
        let deletepanel=(
            // <span>我是绿色</span>
            <div className="delpanel">
                <h1>回收站</h1>
                <ul className="items delitems">{deletetodos}</ul>
            </div>
        )
        let userdig=(
            <div>
                {this.state.user.id ? 
                    null : 
                    <UserDialog 
                        onSignUp={this.onSignUp.bind(this)}
                        onSignIn={this.onSignIn.bind(this)}/>}
            </div>
        )
        // console.log(todos)
        return(
            <div>
                <Todonew>
                    <section name="备忘录">{mainpanel}</section>
                    <section name="回收站">{deletepanel}</section>
                </Todonew>
                <div>
                    {userdig}
                </div>
            </div>
        )
    }
    onSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
        this.initialtodolist.call(this)
    }
    onsignOut(){
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        stateCopy.todoList=[]
        this.setState(stateCopy)
    }
    onSignUp(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
        this.initialtodolist.call(this)
    }
    toggle(e, todos){
        let oldStatus = todos.status
        todos.status = todos.status === 'completed' ? '' : 'completed'
        
        TodoModel.update(todos, () => {
            this.setState(this.state)
        }, (error) => {
            todos.status = oldStatus
            this.setState(this.state)
        })
        
    }
    changeadd(e,adds){
        console.log('here')
        adds= this.state.add ===''?'completed':''
        this.setState({add:adds})
        console.log(this.state.add)
    }
    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
        // localStorage.save('todoList',this.state.todoList)
    }
    addTodo(event){
        let addTodo={
            title: event.target.value,
            status: '',
            deleted: false
        }
        TodoModel.create(addTodo, (id) => {
            addTodo.id = id
            console.log(addTodo.id)
            console.log(addTodo)
            this.state.todoList.push(addTodo)
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
            console.log(this.state.todoList)
            }, (error) => {
                console.log(error)
            })
    }
    delete(event, todos){
        // todos.deleted = true
        // this.setState(this.state) 
        // localStorage.save('todoList',this.state.todoList)
        TodoModel.destroy(todos.id, () => {
        todos.deleted = true
        this.setState(this.state)
        let currentuser = getCurrentUser()
        TodoModel.getByUser(currentuser, (todos) => {
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.todoList = todos
            this.setState(stateCopy)
        })
        // this.initialtodolist.call(this)
        })
        // this.initialtodolist.call(this)
    }
    taketodoback(e, todos){
        // let oldDeleted = todos.deleted
        // todos.deleted = todos.deleted === 'true' ? 'false' : 'true'
        // TodoModel.update(todos, () => {
        //     this.setState(this.state)
        // }, (error) => {
        //     todos.status = oldDeleted
        //     this.setState(this.state)
        // })
        TodoModel.getback(todos.id, () => {
        todos.deleted = false
        this.setState(this.state)
        })
    }
}

class Todonew extends Component{
    constructor(props){
        super(props);
        this.state={
            currentIndex:0,
        }
    }
    render(){
        
        return (
            <div  className="aa">
                <nav>
                    <ul>
                        {React.Children.map(this.props.children,
                            (element,index)=>(
                                <li className={this.addTitleClass(index)}
                                onClick={this.changeTab.bind(this,index)}>
                                     {element.props.name}                                     
                                </li>
                            )
                        )}
                    </ul>
                </nav>
                <div>
                        {React.Children.map(this.props.children,
                            (element,index)=>(
                                <div className={this.addPanelClass(index)}>
                                     {element}
                                </div>
                                )
                        )}
                </div>
            </div>

        )   
    }
    changeTab(index){
        this.setState({
            currentIndex: index
        })
        console.log(111)
    }
    addTitleClass(index){
        return index==this.state.currentIndex?'noteclass active':'noteclass';
    }
    addPanelClass(index){
        return index==this.state.currentIndex?'right hover':'right';
    }
}
