import angular from 'angular';
import AppComponent from './app.component.js';
import WorkflowFactory from './app.factory.js';
import WorkflowService from './app.service.js';

require('jquery');
require('jqueryui');
require('./../jsPlumb-2.2.0.js');

angular.module('workflowEditor', [])
.directive('app', AppComponent)
.service('workflowService', WorkflowService)
.factory('flowchart', WorkflowFactory)
.run(function(flowchart) {
  var instance = jsPlumb.getInstance({
    DragOptions : { cursor: 'pointer', zIndex:2000 },
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
    Container:'flowchart'
  });
  flowchart.set({
    'id': 1,
    'instance': instance,
    'nodes': [
      {
        'id': 0,
        'title': 'Public',
        'text': 'Visible for everybody',
        'top': 200,
        'left': 10,
      },
      {
        'id': 1,
        'title': 'Private',
        'text': 'Internally visible only.',
        'top': 0,
        'left': 500,
      },
      {
        'id': 2,
        'title': 'Pending',
        'text': 'Pending for review.',
        'top': 340,
        'left': 420,
      },
    ],
    'transactions': [
      {'from': 0, 'to': 1},
      {'from': 1, 'to': 2}
    ]
  });
});
