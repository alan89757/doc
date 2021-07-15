import React, { useState, memo } from "react";

let child1count = 0;
function Child1(props) {
  console.log("child1___", ++child1count);
  const { num, handleClick } = props;
  return (
    <div
      onClick={() => {
        handleClick(num + 1);
      }}
    >
      child1: { num }
    </div>
  );
}

export default memo(Child1);