/* jshint node:true */
'use strict';

var multiBuilder = require('broccoli-multi-builder');
var mergeTrees = require('broccoli-merge-trees');
var testBuilder = require('broccoli-test-builder');

var vendoredModules = [
  {name: 'mobiledoc-dom-renderer'}
];

var options = {
  packageName: 'mobiledoc-amp-renderer',
  vendoredModules: vendoredModules
};

module.exports = mergeTrees([
  multiBuilder.build('amd', options),
  multiBuilder.build('global', options),
  multiBuilder.build('commonjs', options),
  testBuilder.build()
]);
