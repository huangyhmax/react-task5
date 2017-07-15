import React, {Component} from 'react';
import './test.css'

export default class Todoaa extends React.Component{
    constructor(props){
        super(props)
        this.state={
            todoList:[]
        }
    }
    
    render(){
        let mainpanel=(
            // </div>  
           // <div className="right-top">
            //     <input type="text"  className="suggetion"/>
             <ul>
                <li className="list-normal">我是黄色
                </li>
            </ul>
        )
        let deletepanel=(
            <span>我是绿色</span>
        )
        return(
            <Todonew>
                <section name='yellow'>{mainpanel}</section>
                <section name='green'>{deletepanel}</section>
            </Todonew>
         )
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
            <div className="aa">
                <h3>To Do List</h3>
                <section >
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
                    
                </section>
            </div>
        )   
    }
    changeTab(index){
        this.setState({
            currentIndex: index
        })
    }
    addTitleClass(index){
        return index==this.state.currentIndex?'noteclass active':'noteclass';
    }
    addPanelClass(index){
        return index==this.state.currentIndex?'right hover':'right';
    }
    addInputClass(index){
        return index==this.state.currentIndex?'note-item hover':'note-item';
    }
}


