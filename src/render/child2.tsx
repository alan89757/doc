import React, { useState, memo } from "react";

let child2count = 0;
function Child2(props) {
  console.log("child2___", ++child2count);
  const { text, handleClick } = props;
  return (
    <div
      onClick={() => {
        handleClick(text + 1);
      }}
    >
      child2: { text }
    </div>
  );
}

export default memo(Child2);