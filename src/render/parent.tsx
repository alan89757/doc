import React, { useState, useCallback } from "react";
import Child1 from "./child1";
import Child2 from "./child2";

let parentcount = 0;
function Parent() {
  console.log("parent___", ++parentcount);
  let [num, setNum] = useState(0);
  let [text, setText] = useState(0);

  const handleNum = useCallback(()=> {
    setNum(num + 1);
  }, [num]);

  const handleText = useCallback(()=> {
    setText(text + 1);
  }, [text]);

  return (
    <div>
      <Child1 num={num} handleClick={handleNum} />
      <Child2 text={text} handleClick={handleText} />
    </div>
  );
}

export default Parent;