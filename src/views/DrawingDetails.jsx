import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImageDoc } from '../dbservices/images.js';
import DrawingContainer from '../components/GalleryDrawing/DrawingContainer';
import OptionsMenu from '../components/GalleryDrawing/OptionsMenu';
import UserName from '../components/GalleryDrawing/UserName';

export default function DrawingDetails() {
  const urlParams = useParams();

  const [drawing, setDrawing] = useState();
  useEffect(() => {
    let retrieved = false;

    const fetchData = async () => {
      const response = await getImageDoc(urlParams.id);
      if (!retrieved) {
        setDrawing(response);
      }
    };
    fetchData().catch((err) => console.log(err));

    return () => (retrieved = false);
  }, [urlParams.id]);

  return (
    <div className="row mt-1 px-2 py-3 p-lg-5 bg-secondary">
      <div className="col-12 col-lg-8">
        {drawing && (
          <DrawingContainer
            name={drawing.name}
            id={urlParams.id}
            path={drawing.path}
          />
        )}
      </div>
      {drawing && (
        <div className="col-12 col-lg-4 mt-3 mt-lg-0">
          <div className="bg-light text-dark text-start d-flex flex-column justify-content-between  p-4 h-100">
            <div>
              <h5 className="mb-4 text-break">{drawing.name.toUpperCase()}</h5>
              <div>
                <b>Author: </b> <UserName uid={drawing.authorID} />
              </div>
              <div>
                <b>Game mode: </b>
                <span className="text-info">{drawing.mode}</span>
              </div>
              <DrawingDate date={drawing.date} />
              <DrawingSize size={drawing.size} />
            </div>
            <OptionsMenu
              id={urlParams.id}
              authorID={drawing.authorID}
              path={drawing.path}
              name={drawing.name}
              mode={drawing.mode}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DrawingSize(props) {
  let size = 1;

  size = (props.size / 1024).toFixed(0);
  return (
    <p>
      <b>Size: </b>
      {size} KB
    </p>
  );
}

function DrawingDate(props) {
  let formattedDate;
  if (props.date) {
    const date = props.date.toDate().toISOString().split('T');
    const ymd = date[0];
    const hour = date[1].split('.')[0];
    formattedDate = `${ymd}, ${hour}`;
  }

  return (
    <div>
      <b>Date:</b> {formattedDate}
    </div>
  );
}