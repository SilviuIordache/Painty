import { useEffect, useState } from 'react';
import { getUserProfile } from '../../dbservices/users.js';

export default function TopBanner(props) {
  const style = {
    backgroundColor: "lightgray",
    fontSize: "1rem",
    padding: "0.3rem 0.5rem",
    display: "flex",
    justifyContent: "space-between"
  }

  const [authorName, setAuthorName] = useState();
  useEffect(() => {
    let imageRetrieved = false;
    const fetchData = async () => {
      const data = await getUserProfile(props.authorID);
      if (!imageRetrieved) {
        setAuthorName(data.displayName);
      }
    };
    fetchData().catch((err) => {
      console.log(err)
    });
    return () => (imageRetrieved = false);
  }, []);

  return (
    <div style={style} className="text-truncate">
      <div className="d-flex">
        {authorName}
      </div>
    </div>
  )
}