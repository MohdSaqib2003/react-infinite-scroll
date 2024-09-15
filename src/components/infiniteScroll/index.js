import React, { useEffect, useState } from "react";
import "./index.css";

const InfiniteScroll = () => {
  const [count, setCount] = useState(10);

  const onScroll = () => {
    // if scrolled to the bottom
    if (
      window.innerHeight + window.scrollY >=
      window.document.body.offsetHeight
    ) {
      // update the state
      setCount(count + 10);
    }
  };
  useEffect(() => {
    //scroll event
    window.addEventListener("scroll", onScroll);

    // memory cleanup, remove listener
    return () => window.removeEventListener("scroll", onScroll);
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

  console.log("Render: ", count);

  return <div className="item-container">{elements}</div>;
};

export default InfiniteScroll;
