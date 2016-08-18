import template from "./app.html";
import controller from "./app.controller";

let appComponent = () => {
  return {
    restrict: "E",
    scope: {},
    template,
    controller,
    controllerAs: "vm",
    bindToController: true
  };
};

export default appComponent;
