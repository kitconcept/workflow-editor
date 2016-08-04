let workflowFactory = () => {
  var flowchart = null;
  return {
    get: function() { return flowchart; },
    set: function(fc) { flowchart = fc; }
  };
};

export default workflowFactory;
