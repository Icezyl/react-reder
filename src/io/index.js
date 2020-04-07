import IO from 'socket.io-client'
const io = IO.connect('http://localhost:5000')

// function open(id) {
//   ws.emit('open', { id: id })
// }
// function send(data) {
//   ws.emit('send', data)
//   console.log(2821)
//   ws.on(data.to, (data) => {
//     console.log(data)
//     // dispatch({
//     //   type: 'setMessageList',
//     //   payload: { messageList: data }
//     // })
//   })
// }
// function close(id) {
//   ws.emit('disconnection', { id: id })
// }


export default io