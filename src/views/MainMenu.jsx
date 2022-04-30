import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BasicCard from "../components/BasicCard/BasicCard";

export default function MainMenu() {
  const navigate = useNavigate();

  const { getImages } = useAuth();
  const [images, setImages] = useState([]);

  useEffect(() => {
    let dataRetrieved = false;
    const fetchData = async () => {
      const data = await getImages();
      if (!dataRetrieved) {
        setImages(data);
      }
    };
    fetchData().catch(console.error);

    return () => dataRetrieved = false;
  }, [getImages]);

  const style = {
    backgroundColor: "#c0d1cd"
  }
  return (
    <div className="row rounded pt-4 pb-5" style={style}>
      <div className="col-12 mb-5">
        <h1>Painty 🎨</h1>
        <p>Draw words against the clock or pratice freely without a time constraint</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"CHALLENGE ⏳"}
              subTitle={"game mode"}
              description={"Draw against the clock."}
              buttonCallback={() => {navigate('/draw/challenge')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"PRACTICE 🖌"}
              subTitle={"game mode"}
              description={"Draw freely with unlimited time."}
              buttonCallback={() => {navigate('/draw/practice')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"GALLERY 🖼️"}
              subTitle={images.length + ' drawing(s)'}
              description={"A collection of your drawings"}
              buttonCallback={() => {navigate('/gallery')}}
              buttonText={"VIEW"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
