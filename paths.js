var path = require('path');

module.exports = {

    SRC : path.join(__dirname, 'src'),
    SRC_JS : path.join(__dirname, 'src', 'app'),
    SRC_MAIN_JS: path.join(__dirname, 'src', 'app', 'main.js'),
    //SRC_CONFIG_JSON: path.join(__dirname, 'src', 'config.json'),
    SRC_COPY_JSON: path.join(__dirname, 'src', 'copy.json'),

    //HARP_JS: path.join(__dirname, 'src', '_harp.json'),
    DATA_JS: path.join(__dirname, 'src', '_data.json'),

    PUBLIC : path.join(__dirname, 'public'),
    PUBLIC_JS : path.join(__dirname, 'public', 'javascript'),
    PUBLIC_MAIN_JS: path.join(__dirname, 'public', 'javascript', 'main.js'),
    //PUBLIC_JS_COMPONENTS : path.join(__dirname, 'public', 'js', 'components'),
    PUBLIC_COPY_JSON: path.join(__dirname, 'public', 'copy.json'),
    //PUBLIC_CONFIG_JSON: path.join(__dirname, 'public', 'copy.json'),

    DOCS : path.join(__dirname, 'extras/docs'),

    VIEWS : path.join(__dirname, 'views')
};