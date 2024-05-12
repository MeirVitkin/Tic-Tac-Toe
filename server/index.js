
const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require('socket.io'),
    cross = require('cors');

app.use(cross());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '* ' } })

const rooms = {}
const waitingRooms = {}

io.on('connection', (socket) => {

    socket.on('create-room', () => {
        const roomNumber = Math.floor(Math.random() * 900000) + 100000
        while (waitingRooms[roomNumber] || rooms[roomNumber]) {
            roomNumber = Math.floor(Math.random() * 900000) + 100000
        }
        socket.join(roomNumber)
        waitingRooms[roomNumber] = { players: [socket.id] }
        console.log(waitingRooms);
        socket.emit('create-room', roomNumber);
    })


    socket.on('join-room', (roomNumber) => {
        console.log(waitingRooms[roomNumber]?.players?.length);
        if (waitingRooms[roomNumber] && waitingRooms[roomNumber]?.players?.length == 1) {
            socket.join(roomNumber)
            waitingRooms[roomNumber].players.push(socket.id);
            socket.emit('join-room', roomNumber);
            io.to(waitingRooms[roomNumber].players[0]).emit('join-room', roomNumber);
        } else { socket.emit('join-room'), false }
        console.log(waitingRooms);
    })

    socket.on('choose-player', (player, roomNum) => {
        // io.emit('set-player' , player)
        console.log(roomNum);
        io.to(waitingRooms[roomNum]?.players[0]).emit('set-player', player);
        io.to(waitingRooms[roomNum]?.players[1]).emit('set-player', player == 'X' ? 'O' : 'X');
    })

    socket.on('lets-play',()=>{
        io.emit('navigate-to-play-board')
    } )





    console.log("connected", socket.id);
})





server.listen(3000, () => console.log('@@@@@@@ server is listening on port 3000 @@@@@@'))