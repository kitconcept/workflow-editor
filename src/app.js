import angular from 'angular';
import AppComponent from './app.component.js';

require('jquery');
require('jqueryui');
require('./../jsPlumb-2.2.0.js');

angular.module('workflowEditor', []).directive('app', AppComponent).run(
  jsPlumb.ready(function() {
    jsPlumb.connect({
      source:"item_left",
      target:"item_right",
      endpoint:"Rectangle"
    })
  })
);

