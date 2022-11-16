var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

var current_data = "";
var old_data = "";

ros.on('connection', function () {
    //alert("Connected");
    eyes.startBlinking();
});

ros.on('error', function (error) {
    //alert("ERROR");
});

ros.on('close', function () {
    //alert("CLOSED Connection");
});

const orderSub = new ROSLIB.Topic({
    ros: ros,
    name: '/face_node/current_expression_stub',
    messageType: 'std_msgs/String'
});

orderSub.subscribe(message => {
    current_data = message.data;
    console.log(current_data);

    if (current_data != old_data) {
        eyes.express({ type: current_data });
        old_data = current_data;
    }
});
