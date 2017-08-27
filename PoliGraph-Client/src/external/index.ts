const janusAddress = 'ws://40.112.250.222:8182'
const janusClient = new WebSocket(janusAddress)


export default function janusEventHandler(): void {
  janusClient.addEventListener('open', openHandler)
  janusClient.addEventListener('message', messageHandler)
}

function openHandler(data): void {
  console.log('open!',data)
  janusClient.send('test!')
}

function messageHandler(message): void {
  console.log('Message from server ', message.data);
}
