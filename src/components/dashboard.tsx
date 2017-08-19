import * as React from 'react'

export interface HelloProps { name: string; }

const linkStyle = {color: 'black'}

export function Greeting(props: HelloProps){
  return (
    <div>
      <a href="https://github.com/MikeHathaway" style={linkStyle}>
        <h2>Greetings, {props.name}!</h2>
      </a>
    </div>
  )
}


//https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
