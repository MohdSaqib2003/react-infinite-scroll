import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const URL = "https://jsonplaceholder.typicode.com/albums";

const InfiniteScroll = () => {
  const [comments, setComments] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDataFinished, setIsDataFinished] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${URL}?userId=${pageNo}`)
      .then((response) => {
        // add the fetched data to the existing list
        setComments([...comments, ...response.data]);

        // if response is empty means all data is fetched
        if (response.data.length === 0) {
          setIsDataFinished(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error : ", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // make api call, on initial load and when pageno updated
    fetchData();
  }, [, pageNo]);

  const onScroll = () => {
    // if scrolled to the bottom
    if (
      window.innerHeight + window.scrollY >=
      window.document.body.offsetHeight
    ) {
      // update the state
      setPageNo(pageNo + 1);
      //   setComments(comments + 10);
    }
  };
  useEffect(() => {
    //scroll event
    window.addEventListener("scroll", onScroll);

    // memory cleanup, remove listener
    return () => window.removeEventListener("scroll", onScroll);
  }, [comments]);

  //generate list
  const elementsList = [];
  for (let com of comments) {
    elementsList.push(
      <div className="item" key={com.id}>
        Item {com.id} {com.title}{" "}
      </div>
    );
  }
  return (
    <div className="item-container">
      {elementsList}
      <div>
        {!isDataFinished && loading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <h1>Fetched All Data</h1>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
