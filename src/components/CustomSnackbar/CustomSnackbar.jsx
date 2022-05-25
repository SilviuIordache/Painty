import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeSnackBar } from '../../redux/features/snackBarSlice';

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => state.snackbar);
  const autoHideDuration = 3000;
  function handleClose() {
    dispatch(closeSnackBar());
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
