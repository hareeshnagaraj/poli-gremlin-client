import * as React from 'react'

export interface HelloProps { name: string; }

export function Greeting(props: HelloProps){
  return (
    <div>
      <h2>Dashboard</h2>
      Greetings, {props.name}!
    </div>
  )
}


//https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
