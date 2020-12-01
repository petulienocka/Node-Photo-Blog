import React, { useState } from "react";
import "../styles/PhotoList.css";
import axios from "axios";

const PhotoList = () => {
  const [photo, setPhoto] = useState([]);
  const [clientId, setClientId] = useState(
    "5CK791eAJeVrPIjJI-vsWfx_6zmPXcQv6kRuWayIKSU"
  );
  const [result, setResult] = useState([]);

  const handleChange = ev => {
    setPhoto(ev.target.value);
  };
  const handleSubmit = ev => {
    console.log(photo);

    const url =
      "https://api.unsplash.com/search/photos?page=1&query=" +
      photo +
      "&client_id=" +
      clientId;

    axios.get(url).then(response => {
      console.log(response);
      setResult(response.data.results);
    });
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container-2">
          <h1 className="mt-5">Get more inspiration here</h1>
          <br></br>
          <div className="col-sm-6">
            <input
              className="form-control shadow-sm"
              onChange={handleChange}
              type="text"
              name="photo"
              placeholder="Get more inspiration here"
            ></input>
            <br></br>
            <button
              className="btn btn-dark"
              onClick={handleSubmit}
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
        <br></br>
        <div className="col-sm-12 col-sm-offset-3">
          <div className="row">
            <div className="col-sm-12">
              <div className="thumbnail">
                {result.map((photo, index) => (
                  <img key={"index-" + index} src={photo.urls.small} alt="" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoList;

/*import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [clientId, setClientId] = useState(
    "5CK791eAJeVrPIjJI-vsWfx_6zmPXcQv6kRuWayIKSU"
  );

  const handleChange = ev => {
    setPhotos(ev.target.value);
  };

  const getPhotos = async () => {
    try {
      let response = await axios.get(
        "https://api.unsplash.com/photo/photospage=1&query=" +
          photos +
          "&client_id=" +
          clientId
      );
      console.log(response.data.photos);
      setPhotos(response.data.photos);
    } catch (error) {
      console.log(error.data);
    }
  };
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <>
      <h1>Get more inspiration here</h1>
      <div className="col-sm-6">
        <input
          className="form-control shadow-sm"
          onChange={handleChange}
          type="text"
          name="photo"
          placeholder="Get more inspiration here"
        ></input>
        <br></br>
        <button className="btn btn-dark" onClick={getPhotos} type="submit">
          Search
        </button>
      </div>

      {photos.map((photo, index) => {
        return (
          <>
            <div className="col-sm-12 col-sm-offset-3">
              <div className="row" key={"index-" + index}>
                <div className="col-sm-12">
                  <div className="thumbnail">
                    <img src={photo.urls.small} alt=""></img>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default PhotoList; */
