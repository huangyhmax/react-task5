import React, { Component } from 'react';
 
export default class DelTodoItem extends Component {
    render(){
    return (
        <li>
            <input type="text" className="listcxt" defaultValue={this.props.todos.title} disabled/>
            <button className="getback" onClick={this.getback.bind(this)}>撤销</button>
        </li>
    )
   }
    getback(e){
        this.props.onGetback(e, this.props.todos)
        console.log(123)
    }
}


