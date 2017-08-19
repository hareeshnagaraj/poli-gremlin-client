import * as React from 'react'

export interface MessageProps { name: string; text: string; }

export function Message(props: MessageProps){
  return (
    <div>
      <h4>{props.name}</h4>
      <p> {props.text}</p>
    </div>
  )
}
