import { useNavigate } from "react-router-dom";
import BasicCard from "../components/BasicCard/BasicCard";

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
        <p>A painting app where you draw the word</p>
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
              subTitle={getDrawingsNumber() + ' drawing(s)'}
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
