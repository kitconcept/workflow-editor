import angular from "angular";
import WorkflowEditorComponent from "./app.component.js";
import WorkflowService from "./app.service.js";
require("./styles.css");

angular.module("workflowEditor", [])
.directive("app", WorkflowEditorComponent)
.service("workflowService", WorkflowService);
