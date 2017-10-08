const janusAddress = 'ws://40.112.250.222:8182'
const janusClient: WebSocket = new WebSocket(janusAddress)


export default function janusEventHandler(): WebSocket {
  janusClient.addEventListener('open', openHandler)
  janusClient.addEventListener('message', messageHandler)
  return janusClient
}

function openHandler(data): void {
  console.log('open!',data)
  janusClient.send('test!')
}

function messageHandler(message): void {
  console.log('Message from server ', message.data);
}
