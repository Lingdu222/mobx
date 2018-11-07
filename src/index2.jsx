/**
 * 基础概念 created by zhangyuhong 2018/11/5
 */

import {
    observable,//变成可以被观察的对象
    isArrayLike,
    computed
} from "mobx"

// ⚠️array
const arr = observable(["a",2,4,5])
// console.log(arr)
// console.log(Array.isArray(arr)) // 不知道为什么，视频上面是false 而我打印出来是ture
// console.log(isArrayLike(arr)) // ture mobx提供的，向数组的方法，基本上具备了数组的一切属性
// console.log(arr[4])// mobx 不支持越界访问  会给你警告⚠️



// ⚠️object
const obj = observable({a:1,b:2,c:3})
// console.log(obj)

// ⚠️基本数据类型用 observable.box 变成可观察的数据

const num=observable.box(20)
const sty=observable.box("zhangyuhong")
const bool=observable.box(false)

// ⚠️得到原始值 get()
// console.log(num.get())
// console.log(sty.get())
// console.log(bool.get())


// ⚠️修改原始值 set()
// console.log(num.set(30))
// console.log(sty.set("jiangbo"))
// console.log(bool.set(true))

// ⚠️得到原始值
// console.log(num.get())
// console.log(sty.get())
// console.log(bool.get())



// ⚠️ @observable：在类中，不区分基本数据类型还是引用类型，全部都用修饰@observable，很智能，可以自定识别你是什么数据类型
// ⚠️ computed   ：计算值
// ⚠️ autorun    ：在可观察数据被修改之后 ， 自动执行依赖可观察数据的行为 ， 这个行为一般是指传过autorun的函数
// ⚠️ when(a,b)  : 参数一：必须是根据 【可观察数据】生成的布尔值 ，参数二：回调函数；如果第一个参数一开始就是true，那么第二个参数函数是同步执行的
// ⚠️ reaction   : 数据被第一次填充之后才启动一些缓存
// ⚠️ action     : 任何修改【状态】的行为，减少触发autorun的次数
class Store{
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = "hello";
    @observable number = 20;
    @observable bool = false;
}