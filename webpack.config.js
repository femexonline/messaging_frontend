module.export={
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/,
                query:{presets:["env"]}
                // query:{presets:["babel-preset-stsge-3"]}
            }
        ]
    }
}