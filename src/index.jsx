/**
 * 优化后的TodoList created by zhangyuhong 2018/11/5
 */


import React, { Component, Fragment } from "react"
import ReactDom from "react-dom"
import PropTypes from "prop-types"
import { trace, toJS, spy, observe, observable, action, computed } from "mobx"
import { observer } from "mobx-react"
class appState {
    @observable time = 0;
    @action.bound resetTimer() {
        setInterval(() => {
            this.timer += 1;
        }, 1000)
    }
}
@observer
class TimerView extends Component {
    onReset = () => {
        this.props.appState.resetTimer()
    }
    render() {
        return (
            <button onClick={this.onReset} className="bth">
                {this.props.appState.timer}
            </button>
        )
    }
}
// appState.resetTimer = action(function reset() {
//     appState.timer = 0;
// });

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);
ReactDom.render(<TimerView appState={appState} />, document.getElementById("root"))