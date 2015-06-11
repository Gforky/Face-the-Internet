$ = require('jquery');
require('backbone').$ = $ || jQuery;
var __ = require('underscore');
__.templateSettings.interpolate = /\{\{-(.+?)\}\}/g;
__.templateSettings.escape = /\{\{=(.+?)\}\}/g;
__.templateSettings.evaluate = /\{\{(.+?)\}\}/g;
window.app = require('./core/Application.js');
