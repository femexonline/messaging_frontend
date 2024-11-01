module.exports = {
    //...development,production
    mode:"production",
    entry: {
        messages: {
            import: './js/messages.js', 
            filename: '../src/messages.js',
        },
    },
  };