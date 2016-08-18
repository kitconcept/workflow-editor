import angular from "angular";
import AppComponent from "./app.component.js";
import WorkflowService from "./app.service.js";
require("./styles.css");

angular.module("workflowEditor", [])
.directive("app", AppComponent)
.service("workflowService", WorkflowService);
