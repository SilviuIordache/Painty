import DrawingOptions from 'pages/@shared/DrawingOptions'
import UserName from 'pages/@shared/UserName';

export default function TopBanner(props) {

  const style = {
    backgroundColor: "lightgray",
    fontSize: "1rem",
    padding: "0.3rem 0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "3rem"
  }

  return (
    <div style={style} className="text-truncate d-flex">
      <div className="d-flex">
        <UserName uid={props.authorID}/>
      </div>
        <DrawingOptions
          authorID={props.authorID}
          id={props.id}
          path={props.path}
          name={props.name}
          mode={props.mode}
        />
    </div>
  )
}