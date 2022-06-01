import { useNavigate } from 'react-router-dom';
import React from 'react';
import BasicCard from '../components/BasicCard/BasicCard';
import ChallengeCard from '../components/MainMenu/ChallengeCard';
import GalleryCard from '../components/MainMenu/GalleryCard';

import { fetchImages } from '../redux/features/imagesSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function MainMenu() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(fetchImages(currentUser.uid));
  }, [dispatch, currentUser.uid]);

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
            <ChallengeCard />
          </div>
          <div className="col-6 ">
            <div className="row">
              <div className="col-6 mb-2">
                <BasicCard
                  title={'Practice'}
                  subTitle={'freestyle with unlimited time'}
                  buttonCallback={() => {
                    navigate('/draw/practice');
                  }}
                  buttonText={'Start'}
                />
              </div>
              <div className="col-6 mb-2">
                <BasicCard
                  title={'Challenge'}
                  subTitle={'time-attack mode'}
                  buttonCallback={() => {
                    navigate('/draw/challenge');
                  }}
                  buttonText={'Start'}
                />
              </div>
            </div>
            <div className="col-12">
              <GalleryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
