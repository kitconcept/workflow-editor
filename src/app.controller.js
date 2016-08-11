 // import WorkflowService from './app.service.js'

 var flowchartEndpointOptions = {
    endpoint:'Dot',
    isSource:true,
    isTarget:true,
    maxConnections:-1,
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
      var anchors = ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle'];
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i];
        instance.addEndpoint(
          toId,
          flowchartEndpointOptions,
          {
            anchor:anchors[i],
            uuid:sourceUUID
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
          console.log(transition);
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
