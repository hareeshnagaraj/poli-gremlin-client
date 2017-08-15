import * as React from "react";
import * as rx from 'rxjs'


export interface HelloProps {
  name: string;
}

function Hello({name}: HelloProps){
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name}
      </div>
    </div>
  );
}

export default Hello;
