import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { FaUserCog } from "react-icons/fa";

const axios = require("axios");

const Profile = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleClick = ev => {
    ev.preventDefault();
    if (true) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      //console.log(formData["title"]);
      axios({
        method: "POST",
        url: "http://localhost:9090/posts/create",
        withCredentials: true,
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          setMessage(`${title} has been posted in ${category} category.`);
        } else setMessage("Failed.");
      });
    } else setMessage("Data missing.");
  };

  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        let response = await axios.get("http://localhost:9090/user", {
          withCredentials: true
        });

        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error.data);
      }
    };
    getUser();
  }, []);

  const { informations } = user;
  console.log(informations);

  async function deleteUser() {
    try {
      const request = await axios.delete(
        `http://localhost:9090/users/delete/`,
        { withCredentials: true }
      );

      history.replace("/login");
      console.log("The user has been deleted");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="float-right mr-5 mt-5">
        <Popup
          contentStyle={{
            width: "300px",
            height: "200px",
            fontFamily: "Heiti SC"
          }}
          trigger={
            <div>
              <FaUserCog
                style={{
                  width: 50,
                  height: 50
                }}
              />
            </div>
          }
          position="bottom right"
        >
          <div>
            <div>
              <p className="mt-3">{user.email}</p>
              {informations &&
                informations.map(information => <p>{information.data}</p>)}
            </div>
            <div className="mt-3 ml-3">
              <a href="/home" style={{ color: "rgb(199, 122, 6" }}>
                Update your account
              </a>
            </div>
            <br></br>
            <div className="mb-3 ml-3">
              <button
                className="btn btn-dark"
                type="button"
                onClick={deleteUser}
              >
                Delete your account
              </button>
            </div>
          </div>
        </Popup>
      </div>
      <div className="container-fluid">
        <h1>Create your photography post</h1>
        <p>and inspire others....</p>
        <br></br>

        <form encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="postTitleInput">Title</label>
              <input
                className="form-control"
                type="text"
                id="postTitleInput"
                onChange={event => setTitle(event.target.value)}
              ></input>
            </div>
            <br></br>

            <div className="form-group col-md-6">
              <label htmlFor="postCategoryInput">Category</label>
              <select
                className="form-control"
                type="text"
                id="postCategoryInput"
                onChange={event => setCategory(event.target.value)}
              >
                <option value="default">Default select</option>
                <option value="portraits">Portraits</option>
                <option value="nature">Nature</option>
                <option value="abstract">Abstract</option>
                <option value="production">Production</option>
                <option value="urban">Urban</option>
              </select>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="postDescription">Description</label>
            <textarea
              className="form-control"
              type="text"
              id="postDescription"
              onChange={event => setDescription(event.target.value)}
            ></textarea>
          </div>

          <br></br>
          <div className="form-group">
            <label htmlFor="imageInput">Photo</label>
            <input
              className="form-control"
              id="imageInput"
              type="file"
              alt="my photo"
              accept="image/png, image/jpg, image/jpeg"
              onChange={event => {
                setImage(event.target.files[0]);
              }}
            ></input>
          </div>
          <br></br>

          <div className="button">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClick}
            >
              Add Post
            </button>
          </div>
        </form>
      </div>

      <h2>{message}</h2>
    </>
  );
};

export default Profile;
