import IO from 'socket.io-client'
const io = IO.connect('http://localhost:5000')

export default io