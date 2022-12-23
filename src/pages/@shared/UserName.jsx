import { useEffect, useState } from 'react';
import { getUserProfile } from '../../dbservices/user/getUserProfile';

export default function AuthorName(props) {

  const [authorName, setAuthorName] = useState();
  useEffect(() => {
    let authorRetrieved = false;
    const fetchData = async () => {
      const data = await getUserProfile(props.uid);
      if (!authorRetrieved) {
        setAuthorName(data.displayName);
      }
    };
    fetchData().catch((err) => {
      console.log(err)
    });
    return () => (authorRetrieved = true);
  }, [props.uid]);

  return <div className="d-inline">{authorName}</div>;
}
