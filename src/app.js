import angular from "angular";
import ngMockE2E from "angular-mocks";
import WorkflowEditorComponent from "./workflowEditor.component.js";
import WorkflowService from "./workflowEditor.service.js";
require("./styles.css");

angular.module("workflowEditor", ['ngMockE2E'])
.directive("app", WorkflowEditorComponent)
.service("workflowService", WorkflowService)
.run(function($httpBackend) {

  let workflow = {
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
    "transitions": [
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
  }

  // GET workflow
  $httpBackend.whenGET(/\api\/workflow(\/\d*)*/).respond(
    function(method, url, data, headers) {
      console.log("GET -> " + url);
      return [200, workflow];}
  );

  // PUT workflow
  $httpBackend.whenPUT(/\api\/workflow(\/\d*)*/).respond(
    function(method, url, data, headers) {
      console.log("PUT -> " + url);
      return [200, data];
    }
  );

  // --- PASS THROUGH TEMPLATES ----------------------------------------------
  var templates_re = new RegExp('.*.html$');
  $httpBackend.whenGET(templates_re).passThrough();

});
