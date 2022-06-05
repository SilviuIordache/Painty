import { useEffect, useState } from 'react';
import { getUserProfile } from '../../dbservices/users.js';

export default function AuthorName(props) {

  const [authorName, setAuthorName] = useState();
  useEffect(() => {
    let authorRetrieved = false;
    const fetchData = async () => {
      const data = await getUserProfile(props.authorID);
      if (!authorRetrieved) {
        setAuthorName(data.displayName);
      }
    };
    fetchData().catch((err) => {
      console.log(err)
    });
    return () => (authorRetrieved = false);
  }, [props.authorID]);

  return <div className="d-inline">{authorName}</div>;
}
