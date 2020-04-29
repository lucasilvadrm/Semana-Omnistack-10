import socketio from 'socket.io-client'

const socket = socketio('http://10.0.0.108:3333', {
    autoConnect: false
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction) //ouvir um evento
}

function connect(latitude, longitude, techs) {
    //enviando para o backend
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect()

    // socket.on('message', text => {
    //     console.log(text)
    // })
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}