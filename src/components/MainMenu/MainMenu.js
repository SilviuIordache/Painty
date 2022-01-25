import { Link, useNavigate } from "react-router-dom";
import BasicCard from "../BasicCard/BasicCard";


export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="row bg-secondary rounded pt-4 pb-5">
      <div className="col-12 mb-5">
        <h1>Painty 🎨</h1>
        <p>Painty is a drawing game in which you try to make drawings of various random words.</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <BasicCard
              title={"CHALLENGE ⏳"}
              subTitle={"game mode"}
              description={"A time-constraint game mode where you have to paint drawings in less than 30 seconds."}
              buttonCallback={() => {navigate('/draw/challenge')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-4">
            <BasicCard
              title={"PRACTICE 🖌"}
              subTitle={"game mode"}
              description={"Train your painting skills in this unlimited-time game mode."}
              buttonCallback={() => {navigate('/draw/practice')}}
              buttonText={"START"}
            />
          </div>
          <div className="col-4">
            <BasicCard
              title={"GALLERY 🖼️"}
              subTitle={"drawing collection"}
              description={"View the drawings you paint so far."}
              buttonCallback={() => {navigate('/gallery')}}
              buttonText={"VIEW"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
