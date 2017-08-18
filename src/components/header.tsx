import * as React from "react"

export interface HelloProps { name: string; }

export function Greeting(props: HelloProps){
  return (
    <div>
      <h1> {props.name} </h1>
    </div>
  )
}
