import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const InfiniteScroll = () => {
  const [count, setCount] = useState(10);
  const divRef = useRef(null);

  const onScroll = () => {
    // if scrolled to the bottom inside div
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setCount(count + 10);
    }
  };
  useEffect(() => {
    //scroll event added to the div
    divRef.current.addEventListener("scroll", onScroll);

    // memory cleanup, remove listener
    return () => divRef.current.removeEventListener("scroll", onScroll);
  }, [count]);

  //generate list
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <div className="item" key={i}>
        Item {i + 1}{" "}
      </div>
    );
  }

  return (
    <div ref={divRef} className="item-container">
      {elements}
    </div>
  );
};

export default InfiniteScroll;
