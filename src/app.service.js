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
          'text': 'Visible for everybody.',
          'top': 200,
          'left': 50,
        },
        {
          'id': 1,
          'title': 'Private',
          'text': 'Internally visible only.',
          'top': 50,
          'left': 500,
        },
        {
          'id': 2,
          'title': 'Pending',
          'text': 'Pending for review.',
          'top': 340,
          'left': 420,
        },
        {
          'id': 3,
          'title': 'Deleted',
          'text': 'Deleted.',
          'top': 540,
          'left': 220,
        },
      ],
      'transactions': [
        {'from': 0, 'to': 1, 'fromAnchor': 'RightMiddle', 'toAnchor': 'LeftMiddle'},
        {'from': 1, 'to': 2, 'fromAnchor': 'BottomCenter', 'toAnchor': 'TopCenter'},
        {'from': 2, 'to': 0, 'fromAnchor': 'LeftMiddle', 'toAnchor': 'BottomCenter'}
      ]
    }
  }
}

export default WorkflowService;
