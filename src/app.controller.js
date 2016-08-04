 var flowchartEndpointOptions = {
    endpoint:'Dot',
    isSource:true,
    isTarget:true,
    maxConnections:-1,
    connector: [
      'Flowchart',
      { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true }
    ],
    dropOptions:{ hoverClass:'hover', activeClass:'active' },
  };

class AppController {
  constructor(flowchart) {
    this.name = 'Flowchart Example';
    this.flowchart = flowchart.get();
    var instance = this.flowchart.instance;
    var _addEndpoints = function(toId) {
      var anchors = ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle'];
      for (var i = 0; i < anchors.length; i++) {
        var sourceUUID = toId + anchors[i];
        instance.addEndpoint(
          toId,
          flowchartEndpointOptions,
          {
            anchor:anchors[i],
            uuid:sourceUUID
          }
        );
      }
    };

    jsPlumb.ready(function() {
      instance.doWhileSuspended(function() {
        instance.draggable($('.node'), { grid: [20, 20] });
        _addEndpoints('container0');
        _addEndpoints('container1');
        _addEndpoints('container2');
        instance.connect({uuids:['container0RightMiddle', 'container1LeftMiddle'], editable:true});
        instance.connect({uuids:['container1BottomCenter', 'container2RightMiddle'], editable:true});
        instance.connect({uuids:['container2LeftMiddle', 'container0BottomCenter'], editable:true});
      });
    });
  }
}

export default AppController;
