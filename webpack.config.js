const path=require("path")
const config={
    mode:'development',
    entry:path.resolve(__dirname,'src/index.jsx'),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.jsx$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env','react'],// 编译规则：也可以写成presets:['babel-preset-env']
                        plugins:['transform-decorators-legacy','transform-class-properties']//这两个插件放的顺序很关键，放反的话抱错，坑啊
                    }
                }
            }
        ]
    },
    devtool:'inline-source-map'

}
module.exports=config