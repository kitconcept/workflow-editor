 // import WorkflowService from './app.service.js'

 var flowchartEndpointOptions = {
    endpoint: ['Dot', {radius: 5} ],
    isSource: true,
    isTarget: true,
    maxConnections: -1,
    connector: [
      'Flowchart',
      { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true }
    ],
    dropOptions:{ hoverClass:'hover', activeClass:'active' },
  };

class AppController {
  constructor(workflowService) {
    this.name = 'Flowchart Example';
    this.flowchart = workflowService.getWorkflow();
    let workflow = this.flowchart;
    var instance = jsPlumb;
    var _addEndpoints = function(toId) {
      var anchors = [
        // [dX, dY, anchorOrientationX, anchorOrientationY]
        'TopCenter', // [0.5, 0, 0, 1, 'TopCenter'], // Top Center
        'BottomCenter', // [0.5, 1, 0, 0, 'BottomCenter'], // Bottom Center
        'LeftMiddle', // [0, 0.5, 1, 1, 'LeftMiddle'],  // Left Middle
        'RightMiddle', // [1, 0.5, 1, 0, 'RightMiddle'] // Right Middle
      ];
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i];
        instance.addEndpoint(
          toId,
          flowchartEndpointOptions,
          {
            anchor: anchors[i],
            uuid: sourceUUID
          }
        );
      }
    };

    jsPlumb.ready(function() {
      instance.doWhileSuspended(function() {
        workflow.nodes.forEach(function(node) {
          _addEndpoints('container' + node.id);
        })
        workflow.transactions.forEach(function(transition) {
          instance.connect({
            uuids: [
              'container' + transition.from + 'RightMiddle',
              'container' + transition.to + 'LeftMiddle'
            ],
            editable:true
          });
        })
        // this sucks. something is wrong with the execution order.
        setTimeout(function(){
          instance.draggable($('.node'), { grid: [20, 20] });
        }, 2000);
      });
    });
  }
}

export default AppController;
