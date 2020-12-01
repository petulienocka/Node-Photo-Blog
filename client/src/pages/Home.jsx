import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import Search from "../components/Search";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      let response = await axios.get("http://localhost:9090/posts", {
        withCredentials: true
      });

      console.log(response.data.posts);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error.data);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-dark">
        <div className="container-1">
          <img src="/logo.png" alt="logo" style={{ width: 250 }}></img>
          <br></br>
          <br></br>
          <h1 className="display-4">Inspiration, Creativity, Talent</h1>
          <br></br>
          <p>Join us and share your work with other talented photographers.</p>
          <br></br>
          <Search />
          <br></br>
          <a className="nav-link" href="/list">
            Get more inspiation here
          </a>
        </div>
      </div>
      <div>
        {posts.map((post, index) => {
          return (
            <>
              <div className="container-fluid">
                <div className="row" key={"index-" + index}>
                  <div className="col-md-6 col-sm-12">
                    <img
                      className="rounded shadow-lg"
                      src={`http://localhost:9090/images/${post.name}`}
                      alt=""
                    ></img>
                  </div>
                  <br></br>
                  <div className="col-md-6 col-sm-12">
                    <h2> {post.title}</h2>
                    <hr></hr>

                    <p>
                      Category:<br></br>
                      <small>{post.category}</small>
                    </p>

                    <p>
                      Description:<br></br>
                      <small>{post.description}</small>
                    </p>
                    <p>
                      Created: <br></br>
                      <small>{post.created_at}</small>
                    </p>
                    <div
                      className="fb-comments"
                      data-href="http://localhost:9090/home"
                      data-numposts="5"
                      data-width=""
                    ></div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
