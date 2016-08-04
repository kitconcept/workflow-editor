import angular from 'angular';
import AppComponent from './app.component.js';

require('jquery');
require('jqueryui');
require('./../jsPlumb-2.2.0.js');

angular.module('workflowEditor', []).directive('app', AppComponent).run(function(flowchart) {
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
          'text': 'R0-Resektion',
          'type': 'status',
          'top': 200,
          'left': 10,
        },
        {
          'id': 1,
          'title': 'Private',
          'text': 'UICC-Stad. I/II ohne RF *',
          'type': 'status',
          'top': 0,
          'left': 500,
        },
        {
          'id': 2,
          'title': 'Pending',
          'text': 'UICC-Stad. I/II mit RF *',
          'type': 'status',
          'top': 340,
          'left': 420,
        },
      ]
    });
}).factory('flowchart', function() {
  var flowchart = null;

  return {
    get: function() { return flowchart; },
    set: function(fc) { flowchart = fc; }
  };
});
