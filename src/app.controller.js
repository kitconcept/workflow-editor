
class AppController {
  constructor(workflowService) {
    this.name = 'Workflow Example';
    this.workflow = workflowService.getWorkflow();
    let workflow = this.workflow;
    var instance = jsPlumb.getInstance({
      DragOptions: {
        cursor: 'pointer',
        zIndex: 2000
      },
      ConnectionOverlays : [
        [ 'Arrow', { location: 0.99 } ],
      ],
      Container: 'workflow-editor'
    });
    var _addEndpoints = function(toId) {
      var anchors = [
        // [x, y, anchorOrientationX, anchorOrientationY, x offset, y offset]
        [0.25, 0, 0, 1, 0, 0, 'TopLeft'],
        [0.75, 0, 0, 1, 0, 0, 'TopRight'],
        [0.25, 1, 0, 0, 0, 0, 'BottomLeft'],
        [0.75, 1, 0, 0, 0, 0, 'BottomRight'],
        [0, 0.25, 0, 0, 0, 0, 'LeftUpper'],
        [0, 0.75, 0, 0, 0, 0, 'LeftLower'],
        [1, 0.25, 0, 0, 0, 0, 'RightUpper'],
        [1, 0.75, 0, 0, 0, 0, 'RightLower'],
      ];
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i][6];
        instance.addEndpoint(
          toId,
          {
            endpoint: ['Dot', {radius: 4} ],
            isSource: true,
            isTarget: true,
            maxConnections: -1,
            connector: [
              'Flowchart',
              {
                stub: [40, 60],
                gap: 10,
                cornerRadius: 5,
                alwaysRespectStubs:true
              }
            ],
            dropOptions:{
              hoverClass: 'hover',
              activeClass: 'active'
            },
            anchor: anchors[i],
            uuid: sourceUUID
          }
        );
      }
    };

    jsPlumb.ready(function() {
      instance.doWhileSuspended(function() {
        workflow.states.forEach(function(node) {
          _addEndpoints('state' + node.id);
        })
        workflow.transactions.forEach(function(transition) {
          // we use the uuids approach here so we don't override the connection
          // styles
          let from = 'state' + transition.from + transition.fromAnchor;
          let to = 'state' + transition.to + transition.toAnchor;
          instance.connect({
            uuids: [from, to],
            overlays: [
              [
                'Label',
                {
                  label: transition.label,
                  location: 0.25,
                  cssClass: 'transitionLabel'
                }
              ]
            ],
            editable: true
          });
        })
        // this sucks. something is wrong with the execution order.
        setTimeout(function(){
          instance.draggable($('.state'), { grid: [20, 20] });
        }, 2000);
      });
    });
  }
}

export default AppController;
