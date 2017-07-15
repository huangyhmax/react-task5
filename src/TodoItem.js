import React, { Component } from 'react';
import logo from './img/del.svg'
 
export default class TodoItem extends Component {

    constructor(props){
        super(props)
        this.state={
            add:'',
        }
    }
    render(){
    // let bechecked=(
    //     <input type="text" className="listcxt active" defaultValue={this.props.todos.title} disabled/>
    // )
    // let unchecked=(
    //     <input type="text" className="listcxt" defaultValue={this.props.todos.title} disabled/>
    // )
    return (
        <li>
        <input type="checkbox" className="chexb"
            checked={this.props.todos.status === 'completed'}
            onChange={this.toggle.bind(this)}
        />
        {/*{this.state.add ==='completed'? bechecked:unchecked}*/}
        <div className='listcxt'>{this.props.todos.title}</div>
        {/*<input type="text" className='listcxt' defaultValue={this.props.todos.title} disabled/>*/}
        <img src={logo} alt="删除图标" className="delicon"  onClick={this.delete.bind(this)}/>
        </li>
    )
   }
    // backgroundstatus(){
    //     data=this.props.adds
    //     this.setState({add:data})
    //     alert(this.state.add)
    //     return this.state.add =='completed'? 'listcxt active':'listcxt'
    // }
    toggle(e){
        // this.props.onChangeadd(e,this.props.adds)
        this.props.onToggle(e, this.props.todos)
        // this.state.add=this.props.adds
        // this.setState(this.state)
        // console.log('接收到的'+this.state.add)
    }
    delete(e){
        this.props.onDelete(e, this.props.todos)
        console.log(123)
    }
}


