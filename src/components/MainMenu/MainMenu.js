import { useNavigate } from "react-router-dom";
import BasicCard from "../BasicCard/BasicCard";


export default function MainMenu() {
  const navigate = useNavigate();

  function getDrawingsNumber() {
    const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));

    if (galleryImages?.length) {
      return galleryImages.length
    }
    return 0;
  }

  return (
    <div className="row bg-secondary rounded pt-4 pb-5">
      <div className="col-12 mb-5">
        <h1>Painty 🎨</h1>
        <p>Painty is a drawing game in which you try to make drawings of various random words.</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"CHALLENGE ⏳"}
              subTitle={"game mode"}
              description={"A time-constrained game mode where you have to paint drawings in less than 30 seconds."}
              buttonCallback={() => {navigate('/draw/challenge')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"PRACTICE 🖌"}
              subTitle={"game mode"}
              description={"Train your painting skills in this unlimited-time game mode."}
              buttonCallback={() => {navigate('/draw/practice')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-12 col-lg-4 mb-2">
            <BasicCard
              title={"GALLERY 🖼️"}
              subTitle={getDrawingsNumber() + ' drawing(s)'}
              description={"View the drawings you painted so far."}
              buttonCallback={() => {navigate('/gallery')}}
              buttonText={"VIEW"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
