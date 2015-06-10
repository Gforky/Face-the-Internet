"use strict";

/**
 * @exports core.Global
 * @class
 */
var Global = function () {
};

/**
 * @type {framework.core.Environment}
 * @static
 */
Global.env = null;

/**
 * @type {framework.core.I18n}
 * @static
 */
Global.i18n = null;

/**
 * @type {core.Model}
 * @static
 */
Global.model = null;

module.exports = Global;