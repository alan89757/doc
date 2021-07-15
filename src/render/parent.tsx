import React, { useState, useCallback } from "react";
import Child1 from "./child1";
import Child2 from "./child2";

let parentcount = 0;
function Parent() {
  console.log("parent___", ++parentcount);
  let [num, setNum] = useState(0);
  let [text, setText] = useState(0);


  return (
    <div>
      <Child1 num={num} handleClick={setNum} />
      <Child2 text={text} handleClick={setText} />
    </div>
  );
}

export default Parent;