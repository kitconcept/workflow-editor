import angular from 'angular';
import AppComponent from './app.component.js';
import WorkflowService from './app.service.js';

require('jquery');
require('jqueryui');
require('./../jsPlumb-2.2.0.js');

angular.module('workflowEditor', [])
.directive('app', AppComponent)
.service('workflowService', WorkflowService)
.run(function() {
  var instance = jsPlumb.getInstance({
    DragOptions: {
      cursor: 'pointer',
      zIndex: 2000
    },
    ConnectionOverlays : [
      [ 'Arrow', { location: 0.99 } ],
      [ 'Label',
        {
          location: 0.2,
          id: 'label',
          cssClass: 'aLabel connectionLabel'
        }
      ]
    ],
    Container: 'workflow-editor'
  });
});
