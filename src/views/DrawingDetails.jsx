import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DrawingContainer from '../components/GalleryDrawing/DrawingContainer';
import DrawingButtons from '../components/DrawingButtons/DrawingButtons';

export default function DrawingDetails() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const { getImage } = useAuth();

  const [drawing, setDrawing] = useState();
  useEffect(() => {
    let retrieved = false;
    
    const fetchData = async () => {
      const response = await getImage(urlParams.id);
      if (!retrieved) {
        setDrawing(response);
      }
    }
    fetchData().catch(err => console.log(err));

    return () => (retrieved = false);
  }, [getImage, urlParams.id]);

  function deleteCallback() {
    navigate('/gallery');
  }

  return (
    <div className="row mt-1 px-2 py-3 p-lg-5 bg-secondary">
      <div className="col-12 col-lg-8">
        {drawing &&
        <DrawingContainer
          name={drawing.name}
          id={urlParams.id}
          path={drawing.path}
        />
        }
      </div>
      {
        drawing &&
        <div className="col-12 col-lg-4 mt-3 mt-lg-0">
          <div className="bg-light text-dark text-start d-flex flex-column justify-content-between  p-4 h-100">
            <div>
              <h5 className="mb-4 text-break">{drawing.name.toUpperCase()}</h5>
              <p>
                <b>Game mode: </b>
                <span className="text-info">{drawing.mode}</span>
              </p>
              <DrawingDate date={drawing.date} />
              <DrawingSize size={drawing.size} />
            </div>
            <DrawingButtons
              id={urlParams.id}
              name={drawing.name}
              mode={drawing.mode}
              src={drawing.src}
              deleteCallback={deleteCallback}
              imageHovered={true}
              dynamic={false}
            />
          </div>
        </div>
      }
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
    <p>
      <b>Date:</b> {formattedDate}
    </p>
  );
}
