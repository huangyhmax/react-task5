import React,{Component} from 'react';

export default class TodoInput extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         add:'false'
    //     }
    // }
    render(){ 
        // return <input type="text" className="listname" defaultValue={this.props.content}/>
        return <input type="text" className='listname' placeholder="Write your to-do-list,and press Enter key"
            /*defaultValue={this.props.content}*/
            value={this.props.content}
            onChange={this.changeTitle.bind(this)}
           /*onKeyPress={this.submit}/>*/
            onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key==='Enter'){
            if(e.target.value.trim()!==''){
                this.props.onSubmit(e)
                // this.setState({
                //     add:'true'
                // })
            }else{
                alert("不能啥都不输入哦~")
            }
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}