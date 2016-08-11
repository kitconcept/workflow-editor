class WorkflowService {
  constructor($http) {
      this.$http = $http;
  }
  getWorkflow() {
    return {
      'id': 1,
      'nodes': [
        {
          'id': 0,
          'title': 'Public',
          'text': 'Visible for everybody',
          'top': 200,
          'left': 10,
        },
        {
          'id': 1,
          'title': 'Private',
          'text': 'Internally visible only.',
          'top': 0,
          'left': 500,
        },
        {
          'id': 2,
          'title': 'Pending',
          'text': 'Pending for review.',
          'top': 340,
          'left': 420,
        },
      ],
      'transactions': [
        {'from': 0, 'to': 1},
        {'from': 1, 'to': 2}
      ]
    }
  }
}

export default WorkflowService;
