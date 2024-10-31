what i did
install web pack
install babel

create webpack.config.js file
module.export={
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/,
                query:{presets:["env"]}
            }
        ]
    }
}


what the package.json script looks like
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "build1": "webpack ./js/messages.js --output ./dist/app.bundle.js --mode development",
    "build2": "webpack ./js/messages.js --output ./src/main.js --mode development",
    "build3": "webpack ./js/messages.js --output ./src/main.js --mode development --config webpack.config.js"
  }

for widows users the below line is added to the system path for webpack to work on cli
%USERPROFILE%\AppData\Roaming\npm\


  some npm installations
  npm install -g webpack
  npm install babel-core balel-loader babel-preset-env --save-dev



for css install SASS
npm install -g sass

sass <input.scss> [output.css]

install gulp
npm install gulp -g

npm install gulp-autoprefixer -g

create a gulpfile.js
var gulp=require("gulp");
var autoprefixer=require("gulp-autoprefixer");
