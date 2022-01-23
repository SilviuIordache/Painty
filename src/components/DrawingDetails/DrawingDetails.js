import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DrawingDetails() {
  const urlParams = useParams();
  const [drawing, setDrawing] = useState({
    name: ''
  });
  useEffect(() => {
    const images = JSON.parse(localStorage.getItem("paintyImages"));
    const image = images[urlParams.id];
    setDrawing(image);
  }, [urlParams.id]);

  return (
    <div className="row mt-1 p-5 bg-secondary">
      <div className="col-8">
        <img
          alt={drawing.name}
          src={drawing.src}
          key={drawing.index}
          width="100%"
        />
      </div>
      <div className="col-4 text-light text-start">
        <h1>{drawing.name.toUpperCase()}</h1>
        <p>
          Created in <span className="text-info">{drawing.mode}</span> mode
        </p>
        <p>{drawing.date}</p>
      </div>
    </div>
  );
}
