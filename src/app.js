import angular from "angular";
import WorkflowEditorComponent from "./app.component.js";
import WorkflowService from "./app.service.js";
import ngMockE2E from "angular-mocks";

require("./styles.css");

angular.module("workflowEditor", ["ngMockE2E"])
.directive("app", WorkflowEditorComponent)
.service("workflowService", WorkflowService)
.run(function($httpBackend) {
  var workflow = {
    "id": 1,
    "states": [
      {
        "id": "0",
        "title": "Public",
        "text": "Visible for everybody.",
        "top": 200,
        "left": 50
      },
      {
        "id": "1",
        "title": "Private",
        "text": "Internally visible only.",
        "top": 50,
        "left": 600
      },
      {
        "id": "2",
        "title": "Pending",
        "text": "Pending for review.",
        "top": 340,
        "left": 420
      },
      {
        "id": "65d7042f-ad62-4887-a19f-f1c669f26fa1",
        "title": "Deleted",
        "text": "Deleted.",
        "top": 540,
        "left": 600
      }
    ],
    "transactions": [
      {
        "from": "0",
        "to": "1",
        "fromAnchor": "RightUpper",
        "toAnchor": "LeftUpper",
        "title": "Retract"
      },
      {
        "from": "1",
        "to": "2",
        "fromAnchor": "BottomLeft",
        "toAnchor": "TopLeft",
        "title": "Submit"
      },
      {
        "from": "2",
        "to": "0",
        "fromAnchor": "LeftUpper",
        "toAnchor": "RightLower",
        "title": "Publish"
      },
      {
        "from": "2",
        "to": "2",
        "fromAnchor": "RightLower",
        "toAnchor": "BottomRight",
        "title": "Loop"
      },
      {
        "from": "1",
        "to": "65d7042f-ad62-4887-a19f-f1c669f26fa1",
        "fromAnchor": "BottomRight",
        "toAnchor": "TopRight",
        "title": "Delete"
      }
    ]
  };

  $httpBackend.whenGET("getWorkflow.json").respond(workflow);

  $httpBackend.whenGET(/^\/templates\//).passThrough();

});
