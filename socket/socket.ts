
var io = null;


var socket = {
    init: function (xio) {
        if (io != null)
            throw 'IO has been initialized before, cant initialize again';
        io = xio;

        // Send current time to all connected clients
        var sendTime = function () {
            io.emit('storylocked', { id: '' });
        }

        // Send current time every 10 secs
        setInterval(sendTime, 10000);

        // Emit welcome message on connection
        io.on('connection', function (socket) {
            //// Use socket to communicate with this particular client only, sending it it's own id
            //socket.emit('welcome', { message: 'Welcome!', id: socket.id });

            //socket.on('i am client', console.log);
        });
        
    },
    getIO: function () { return io; }
};

export = socket;