
class AppController {
  constructor(workflowService) {
    this.name = 'Workflow Example';
    this.service = workflowService;
    this.fetchWorkflow();
  }

  fetchWorkflow() {
    this.service.getWorkflow().then((res) => {
      this.workflow = res.data[0];
      this.setupJsPlumbInstance(res.data[0]);
    });
  }

  setupJsPlumbInstance(workflow) {
    let jsPlumbInstanceOptions = {
      DragOptions: {
        cursor: 'pointer',
        zIndex: 2000
      },
      ConnectionOverlays : [
        [ 'Arrow', { location: 0.99 } ],
      ],
      Container: 'workflow-editor'
    };
    let jsPlumbEndpointOptions = {
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
      }
    };
    var instance = jsPlumb.getInstance(jsPlumbInstanceOptions);
    var _addEndpoints = function(toId) {
      var anchors = [
        // [x, y, anchorOrientationX, anchorOrientationY, x offset, y offset]
        [0.25,    0,  0, -1, 0, 0, 'TopLeft'],
        [0.75,    0,  0, -1, 0, 0, 'TopRight'],
        [0.25,    1,  0,  1, 0, 0, 'BottomLeft'],
        [0.75,    1,  0,  1, 0, 0, 'BottomRight'],
        [   0, 0.25, -1,  0, 0, 0, 'LeftUpper'],
        [   0, 0.75, -1,  0, 0, 0, 'LeftLower'],
        [   1, 0.25,  1,  0, 0, 0, 'RightUpper'],
        [   1, 0.75,  1,  0, 0, 0, 'RightLower'],
      ];
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i][6];
        jsPlumbEndpointOptions.anchor = anchors[i];
        jsPlumbEndpointOptions.uuid = sourceUUID;
        instance.addEndpoint(
          toId,
          jsPlumbEndpointOptions
        );
      }
    };

    jsPlumb.ready(function() {
      instance.batch(function () {

        // endpoints
        workflow.states.forEach(function(node) {
          _addEndpoints('state' + node.id);
        })

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
          // init(connInfo.connection);
        });

        // draggable connections
        // (it is important that we do that before we add connections)
        instance.draggable(
          jsPlumb.getSelector("#workflow-editor .state"),
          { grid: [20, 20] }
        );

        // connections
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
                  location: 0.55,
                  cssClass: 'transitionLabel'
                }
              ]
            ],
            editable: true
          });
        })

        // allow connections to be toggled
        instance.bind("click", function (conn, originalEvent) {
          if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
            instance.detach(conn);
          conn.toggleType("basic");
        });

        instance.bind("connectionDrag", function (connection) {
          console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
          console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function (params) {
          console.log("connection " + params.connection.id + " was moved");
        });

      });
    });
  }
}

export default AppController;
