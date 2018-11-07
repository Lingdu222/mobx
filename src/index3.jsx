/**
 * 简单例子 created by zhangyuhong 2018/11/5
 */


import {observable, action} from "mobx"
import React, {Component} from "react"
import ReactDom from "react-dom"
import PropTypes from "prop-types"
import { observer }from "mobx-react"
// import "./index.css"


class Store{
    @observable  cache = {
        queue:[]
    }
    @action.bound update(){// 不加bound的话，就找不到this
        this.cache.queue.push(1)
    }
}
const store = new Store()


//Bar Foo Foo依赖Bar组件

@observer
class Bar extends Component{
    static propTypes = {//小写
        queue : PropTypes.array // 大写
    }
    render(){
        const {queue} = this.props
        return <span style = {{color:'red',fontSize:24,marginRight:10}}>{queue.length}</span>
    }
}

class Foo extends Component{
    static propTypes = {
        cache : PropTypes.object
    }
    render(){
        const {cache} = this.props
        return <div>
            <Bar queue = {cache.queue}/>
            <button onClick = {this.props.update}>增加</button>
        </div>
    }
}

ReactDom.render(<Foo cache = {store.cache} update = {store.update}/>,document.getElementById("root"))