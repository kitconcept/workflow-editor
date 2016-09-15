import "jquery";
import "jqueryui";
import jsPlumb from "./../jsPlumb-2.2.0.js";

class WorkflowEditorController {
  /* @ngInject */
  constructor(workflowService) {
    this.name = "Workflow Editor";
    this.service = workflowService;
    this.loadWorkflow();
    this.instance = null;
  }

  loadWorkflow() {
    this.service.getWorkflow().then((response) => {
      this.workflow = response.data;
      this.setupJsPlumbInstance(response.data);
    });
  }

  saveWorkflow() {
    let workflow = {
      "id": null,
      "states": [],
      "transitions": []
    };
    let states = angular.element(document.getElementsByClassName("state"));
    angular.forEach(states, function(state) {
      workflow.states.push({
        "id": state.id,
        "top": state.style.top,
        "left": state.style.left,
        "title": state.textContent
      });
    });
    let transitions = this.instance.getConnections();
    angular.forEach(transitions, function(transition) {
      workflow.transitions.push({
        "from": transition.source.id,
        "to": transition.target.id,
        "fromAnchor": transition.endpoints[0].anchor.cssClass,
        "toAnchor": transition.endpoints[1].anchor.cssClass,
        "title": transition.getOverlays("Label").Label.label
      });
    });
    this.service.setWorkflow(workflow).then((response) => {
      console.log(JSON.stringify(response.data, null, 2));
    });
  }

  setupJsPlumbInstance(workflow) {
    var workflowEditor = angular.element(
      document.getElementById("workflow-editor")
    );
    workflow.states.forEach(function(state) {
      workflowEditor.append(
        angular.element(
          "<div id='state" + state.id + "'" +
          "     class='state'" +
          "'    style='top: " + state.top + "px; left: " + state.left + "px'>" +
          state.title + "</a>"
        )
      );
    });
    let draggedConnection = {};
    const jsPlumbInstanceOptions = {
      DragOptions: {
        cursor: "pointer",
        zIndex: 2000
      },
      ConnectionOverlays : [
        [ "Arrow", { location: 0.99 } ],
      ],
      Container: "workflow-editor"
    };
    const jsPlumbEndpointOptions = {
      endpoint: ["Dot", {radius: 4} ],
      isSource: false, // we set those dynamically on assignment
      isTarget: false, // we set those dynamically on assignment
      maxConnections: 1, // this is important to make drag & drop of connections work
      connector: [
        "Flowchart",
        {
          stub: [40, 60],
          gap: 10,
          cornerRadius: 5
        }
      ],
      connectorStyle: {
        strokeWidth: 1,
        stroke: "#333",
        joinstyle: "round",
        outlineStroke: "white",
        outlineWidth: 2
      },
      connectorHoverStyle: {
        strokeWidth: 3,
        stroke: "#333",
        outlineWidth: 5,
        outlineStroke: "white"
      },
      hoverPaintStyle: {
        fill: "#333",
        stroke: "#333"
      },
      dragOptions: {}
    };
    const anchors = [
      // [x, y, anchorOrientationX, anchorOrientationY, x offset, y offset]
      [0.25,    0,  0, -1, 0, 0, "TopLeft"],
      [0.75,    0,  0, -1, 0, 0, "TopRight"],
      [0.75,    1,  0,  1, 0, 0, "BottomRight"],
      [0.25,    1,  0,  1, 0, 0, "BottomLeft"],
      [   0, 0.75, -1,  0, 0, 0, "LeftLower"],
      [   0, 0.25, -1,  0, 0, 0, "LeftUpper"],
      [   1, 0.25,  1,  0, 0, 0, "RightUpper"],
      [   1, 0.75,  1,  0, 0, 0, "RightLower"],
    ];
    var instance = jsPlumb.getInstance(jsPlumbInstanceOptions);
    var _addEndpoints = function(toId) {
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i][6];
        let options = Object.create(jsPlumbEndpointOptions);
        options.anchor = anchors[i];
        options.uuid = sourceUUID;
        if (i % 2 === 0) {
          // source endpoint
          options.isSource = true;
          options.isTarget = false;
        } else {
          // target endpoint
          options.isSource = false;
          options.isTarget = true;
          options.endpoint = ["Dot", { radius: 5 }];
          options.paintStyle = {
            stroke: "#333",
            fill: "transparent",
            radius: 4,
            strokeWidth: 1
          };
        }
        instance.addEndpoint(
          toId,
          options
        );
      }
    };
    var _addTransition = function(transition) {
      /*
       * {
       *   "title": "Retract",
       *   "from": "0",
       *   "to": "1",
       *   "fromAnchor": "RightUpper",
       *   "toAnchor": "LeftUpper"
       * }
       *
       */
      // we use the uuids approach here so we don"t override the connection styles
      let from = "state" + transition.from + transition.fromAnchor;
      let to = "state" + transition.to + transition.toAnchor;
      instance.connect({
        uuids: [from, to],
        overlays: [
          [
            "Label",
            {
              id: "Label",
              label: transition.title,
              location: 0.55,
              cssClass: "transitionLabel"
            }
          ]
        ],
        editable: true
      });
    };

    jsPlumb.ready(function() {
      instance.batch(function () {

        // endpoints
        workflow.states.forEach(function(node) {
          _addEndpoints("state" + node.id);
        });

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
        workflow.transitions.forEach(function(transition) {
          _addTransition(transition);
        });

        // temporarily store a connection that is being dragged
        instance.bind("connectionDrag", function (connection) {
          draggedConnection = {
            "title": connection.getOverlays("Label").Label.label,
            "from": connection.source.id.replace("state", ""),
            "to": connection.target.id.replace("state", ""),
            "fromAnchor": connection.endpoints[0]._jsPlumb.currentAnchorClass,
            "toAnchor": connection.endpoints[1]._jsPlumb.currentAnchorClass
          };
        });

        // re-add a connection that has not been properly re-added to an endpoint
        instance.bind("connectionDragStop", function (connection) {
          if (connection.target === null || connection.target === null ) {
            _addTransition(draggedConnection);
          }
        });

      });
    });
    this.instance = instance;
  }
}

export default WorkflowEditorController;
