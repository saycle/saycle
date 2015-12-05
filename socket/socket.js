var io = null;
var socket = {
    init: function (xio) {
        if (io != null)
            throw 'IO has been initialized before, cant initialize again';
        io = xio;
        //// Emit user count
        //io.on('connection', function (socket) {
        //    //// Use socket to communicate with this particular client only, sending it it's own id
        //    //socket.emit('welcome', { message: 'Welcome!', id: socket.id });
        //    //socket.on('i am client', console.log);
        //});
    },
    getIO: function () { return io; }
};
module.exports = socket;
//# sourceMappingURL=socket.js.map