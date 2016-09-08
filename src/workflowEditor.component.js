import template from "./workflowEditor.html";
import controller from "./workflowEditor.controller";

let workflowEditorComponent = () => {
  return {
    restrict: "E",
    scope: {},
    template,
    controller,
    controllerAs: "vm",
    bindToController: true
  };
};

export default workflowEditorComponent;
