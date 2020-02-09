import io from 'socket.io-client'
const ws = io('http://localhost:5000')

function open(id) {
  ws.emit('open', { id: id })
}
function send(data, dispatch) {
  ws.emit('send', data)
  ws.on('send', (data) => {
    console.log(data)
    // dispatch({
    //   type: 'setMessageList',
    //   payload: { messageList: data }
    // })
  })
}
function close() {
  ws.emit('disconnection', { id: 123 })
}



export default {
  open, send, close
}