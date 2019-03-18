var usb = require('usb'),
    term = usb.findByIds(65535, 2);

term.open();

var endpoints = term.interfaces[0].endpoints,
    inEndpoint = endpoints[0],
    outEndpoint = endpoints[1];

inEndpoint.transferType = 2;
inEndpoint.startStream(1, 64);
inEndpoint.transfer(64, function (error, data) {
    if (!error) {
        console.log(data);
    } else {
        console.log(error);
    }
});
inEndpoint.on('data', function (data) {
    console.log(data);
});
inEndpoint.on('error', function (error) {
    console.log(error);
});
outEndpoint.transferType = 2;
outEndpoint.startStream(1, 64);
outEndpoint.transfer(new Buffer('d\n'), function (err) {
    console.log(err);
});