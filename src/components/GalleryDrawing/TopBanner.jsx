import OptionsMenu from './OptionsMenu.jsx'
import { useSelector } from 'react-redux';
import AuthorName from './AuthorName';

export default function TopBanner(props) {
  const { currentUser } = useSelector(state => state.auth);

  const style = {
    backgroundColor: "lightgray",
    fontSize: "1rem",
    padding: "0.3rem 0.5rem",
    display: "flex",
    justifyContent: "space-between"
  }

  return (
    <div style={style} className="text-truncate">
      <div className="d-flex">
        <AuthorName authorID={props.authorID}/>
      </div>
      { props.authorID === currentUser.uid &&
        <OptionsMenu
          authorID={props.authorID}
          id={props.id}
          path={props.path}
          name={props.name}
          mode={props.mode}
        />
      }
    </div>
  )
}