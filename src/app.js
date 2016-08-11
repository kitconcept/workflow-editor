import angular from 'angular';
import AppComponent from './app.component.js';
import WorkflowService from './app.service.js';

require('jquery');
require('jqueryui');
require('./../jsPlumb-2.2.0.js');

angular.module('workflowEditor', [])
.directive('app', AppComponent)
.service('workflowService', WorkflowService);
