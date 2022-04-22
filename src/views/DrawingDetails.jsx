import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DrawingButtons from '../components/DrawingButtons/DrawingButtons';

import getImageURLSize from '../helpers/getImageURLSize';

export default function DrawingDetails() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [drawing, setDrawing] = useState({
    name: 'default',
  });
  useEffect(() => {
    const images = JSON.parse(localStorage.getItem('paintyImages'));
    const image = images.find((img) => img.id === parseInt(urlParams.id, 10));
    setDrawing(image);
  }, [urlParams.id]);

  function deleteCallback() {
    navigate('/gallery');
  }

  return (
    <div className="row mt-1 px-2 py-3 p-lg-5 bg-secondary">
      <div className="col-12 col-lg-8">
        <img
          alt={drawing.name}
          src={drawing.src}
          key={drawing.index}
          width="100%"
        />
      </div>
      <div className="col-12 col-lg-4 mt-3 mt-lg-0">
        <div className="bg-light text-dark text-start d-flex flex-column justify-content-between  p-4 h-100">
          <div>
            <h5 className="mb-4 text-break">{drawing.name.toUpperCase()}</h5>
            <p>
              <b>Game mode: </b>
              <span className="text-info">{drawing.mode}</span>
            </p>
            <DrawingDate date={drawing.date} />
            <DrawingSize src={drawing.src} />
          </div>
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

function DrawingSize(props) {
  let size = 1;

  if (props.src) {
    size = getImageURLSize(props.src);
  }
  return (
    <p>
      <b>Size: </b>
      {size.toFixed(2)} KB
    </p>
  );
}

function DrawingDate(props) {
  let formattedDate;
  if (props.date) {
    const date = props.date.split('T');
    const ymd = date[0];
    const hour = date[1].split('.')[0];
    formattedDate = `${ymd}, ${hour}`;
  }

  return (
    <p>
      <b>Date:</b> {formattedDate}
    </p>
  );
}
