function simulateLiveLineData() {
    var data = [];

    for (var j = 0; j < 2; j++) {
        var series = { "values": [] };
        for (var i = 0; i < 20; i++) {
            series['values'].push(Math.floor(Math.random() * 100));
        }
        data.push(series);
    }
    return {
        "graphset": [{
            "type": "line",
            "series": data
        }]
    };
}