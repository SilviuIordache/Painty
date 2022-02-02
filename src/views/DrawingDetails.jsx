import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DrawingButtons from "../components/DrawingButtons/DrawingButtons";

export default function DrawingDetails() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [drawing, setDrawing] = useState({
    name: 'default'
  });
  useEffect(() => {
    const images = JSON.parse(localStorage.getItem("paintyImages"));
    const image = images.find(img => img.id === parseInt(urlParams.id, 10));
    setDrawing(image);
  }, [urlParams.id]);

  function deleteCallback() {
    navigate('/gallery')
  }

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
        <div>
          <h1>{drawing.name.toUpperCase()}</h1>
          <p>
            Created in <span className="text-info">{drawing.mode}</span> mode
          </p>
          <p>{drawing.date}</p>
        </div>
        <div>
          <DrawingButtons
            id={drawing.id}
            name={drawing.name}
            src={drawing.src}
            deleteCallback={deleteCallback}
            imageHovered={true}
            dynamic={false}
          />
        </div>

      </div>
    </div>
  );
}
