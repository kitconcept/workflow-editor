import angular from "angular";
import AppComponent from "./app.component.js";
import WorkflowService from "./app.service.js";
require("./styles.css");

import $ from "jquery";
import "jqueryui";

angular.module("workflowEditor", [])
.directive("app", AppComponent)
.service("workflowService", WorkflowService);
