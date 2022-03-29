
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast(props) {
  return (
    <div className="drawing-board">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={props.show}
        autoHideDuration={parseInt(process.env.REACT_APP_SNACKBAR_LIFE, 10)}
        onClose={() => {
          props.showCb(false);
        }}
      >
        <Alert
          onClose={() => {
            props.showCb(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
