import { useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentUser, signOut } from '../../redux/features/authSlice.js';

import parseLoginResponse from '../../helpers/parseLoginResponse';

export default function AuthCheck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const parsedUser = parseLoginResponse(user);
        dispatch(setCurrentUser(parsedUser));
        navigate('/');
      } else {
        dispatch(signOut);
        navigate('/login');
      }
    });
  }, [dispatch, navigate]);

  return null
}
