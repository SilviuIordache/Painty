import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BasicCard from '../components/BasicCard/BasicCard';
import ChallengeCard from '../components/MainMenu/ChallengeCard';
import { getImages } from '../dbservices/images.js';

export default function MainMenu() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const { currentUser } = useAuth();
  useEffect(() => {
    let dataRetrieved = false;
    const fetchData = async () => {
      const data = await getImages(currentUser.uid);
      if (!dataRetrieved) {
        setImages(data);
      }
    };
    fetchData().catch(console.error);

    return () => (dataRetrieved = false);
  }, [currentUser.uid]);

  const style = {
    backgroundColor: '#c0d1cd',
  };
  return (
    <div className="row rounded pt-4 pb-5" style={style}>
      <div className="col-12 mb-5">
        <h1>Painty 🎨</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6">
              <ChallengeCard/>
          </div>
          <div className="col-6 ">
            <div className="col-12 mb-2">
              <BasicCard
                title={'Practice'}
                subTitle={'freestyle with unlimited time'}
                buttonCallback={() => {
                  navigate('/draw/practice');
                }}
                buttonText={'Draw'}
              />
            </div>
            <div className="col-12">
              <BasicCard
                title={'Gallery'}
                subTitle={images.length + ' drawing(s)'}
                buttonCallback={() => {
                  navigate('/gallery');
                }}
                buttonText={'View'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
