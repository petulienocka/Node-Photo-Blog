import React, { useState } from "react";
import "../styles/Search.css";
import axios from "axios";

const Search = () => {
  const [post, setPost] = useState([]);
  const [result, setResult] = useState([]);

  const handleChange = ev => {
    setPost(ev.target.value);
  };
  const handleSearch = ev => {
    console.log(post);
  };

  axios.get("http://localhost:9090/posts?query" + post).then(response => {
    console.log(response);
    setResult(response.data.results);
  });

  return (
    <>
      <form method="GET" action="">
        <div className="container-sm">
          <div className="input-group">
            <input
              onChange={handleChange}
              className="form-control"
              type="text"
              placeholder="What are you loking for?"
            />
            <div className="input-group-btn">
              <input
                onClick={handleSearch}
                className="btn btn-default"
                type="submit"
                value="search"
                style={{ backgroundColor: "rgb(230, 122, 6)", color: "white" }}
              ></input>
            </div>
          </div>
        </div>
      </form>
      <div>
        {result.map((post, index) => {
          return (
            <>
              <img key={"index-" + index} src={post} alt="" />;
            </>
          );
        })}
      </div>
    </>
  );
};

export default Search;
