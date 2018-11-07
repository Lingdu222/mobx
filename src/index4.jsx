/**
 * TodoList created by zhangyuhong 2018/11/5
 */


import React,{Component,Fragment} from "react"
import ReactDom from "react-dom"
import PropTypes from "prop-types"
import {observable,action,computed} from "mobx"
import {observer} from "mobx-react"

class Todo{
     id = Math.random()
     @observable title='';
     @observable finished = false
     constructor(title){// 为了操作方便；创建一个构造函数
         this.title = title
     }
     @action.bound toggle(){
         this.finished = !this.finished
     }
}

class Store {
    @observable todos = []
    @action.bound createTodo(title){
        this.todos.unshift(new Todo(title))
    }
    @action.bound removeTodo(todo){
        this.todos.remove(todo)
    }
    @computed get left(){
        return this.todos.filter(todo=>!todo.finished).length
    }
}
const store = new Store()
@observer
class TodoListItem extends Component{
    static propTypes={
        todo:PropTypes.shape({
            // id:PropTypes.number.isRequired,
            // title:PropTypes.string.isRequired,
            // finished:PropTypes.bool.isRequired
        })
    }
    handleClick =(e)=>{
        this.props.todo.toggle()
    }

    render(){
        const {todo}=this.props
        return <Fragment>
           
                <input type="checkbox" checked={todo.finished} onClick={this.handleClick}></input>
                <span className={["title",todo.finished&&"finished"].join(" ")}>{todo.title}</span>
          
        </Fragment>
    }
}

@observer
class TodoList extends Component{
    static propTypes = {
        store:PropTypes.shape({
            todos:PropTypes.array.isRequired,
            createTodo:PropTypes.func,
            // left:PropTypes.func
        }).isRequired
    }
    constructor(props){
        super(props)
        this.state={
            inputValue:''
        }
       
    }
    handleSubmit = e =>{
        e.preventDefault()

        const store2=this.props.store
        const value=this.state.inputValue
        store2.createTodo(value)
        this.setState({
            inputValue:""
        })
    }
    handleChange= e =>{
        const inputValue = e.target.value
        this.setState({
            inputValue:inputValue
        })
    }
    handleClick = ()=>{

    }
    render(){
        const {store} = this.props
        return (
            <div className='todo-list'>
                <header>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text"  
                               placeholder='what needs to be finished' 
                               className='input' 
                               value={this.state.inputValue}
                               onChange={this.handleChange}
                               />
                    </form>
                </header>
                <ul>
                    {
                        store.todos.map((item)=>{
                            return <li key={item.id} className="todo-item">
                                <TodoListItem todo={item}/>
                                <span onClick={e=>{store.removeTodo(item)}} style={{marginLeft:20,cursor:'pointer'}}>X</span>
                            </li>
                        })
                    }
                </ul>
                <footer>
                    还有{store.left} 没有完成
                </footer>
            </div>
        )
    }
}
ReactDom.render(<TodoList store={store}/>,document.getElementById("root"))