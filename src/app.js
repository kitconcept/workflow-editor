import angular from 'angular';
import AppComponent from './app.component.js';
import WorkflowService from './app.service.js';

import $ from 'jquery';
import 'jqueryui';
import jsPlumb from './../jsPlumb-2.2.0.js';

angular.module('workflowEditor', [])
.directive('app', AppComponent)
.service('workflowService', WorkflowService);
