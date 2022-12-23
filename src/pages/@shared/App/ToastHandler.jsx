import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastHandler() {
  return (
    <ToastContainer
      position="bottom-right"
      transition={Slide}
      autoClose={1500}
    />
  );
}
