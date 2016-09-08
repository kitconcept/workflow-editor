class WorkflowEditorService {
  constructor($http) {
    this.$http = $http;
  }
  getWorkflow() {
    return this.$http({
      method: "GET",
      url: "api/workflow/1"
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).error(function(data, status) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert(status);
    });
  }
  setWorkflow(workflow) {
    return this.$http({
      method: "PUT",
      url: "api/workflow/1",
      data: workflow,
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      return data;
    }).error(function(data, status) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert(status);
    });
  }
}

export default WorkflowEditorService;
