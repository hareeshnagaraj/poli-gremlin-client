import * as React from "react";
import * as rx from 'rxjs';

export interface HelloProps { name: string; }

// export const Hello = (props: HelloProps) => <h1>Hello {props.name}!</h1>;

export function Greeting(props: HelloProps){
  return (
    <div>
      Greetings {props.name}
    </div>
  );
}


//https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
