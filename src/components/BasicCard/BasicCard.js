import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard(props) {
  const cardStyle = {
    textAlign: "left",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subTitle}
        </Typography>
        <Typography variant="body2">{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={props.buttonCallback} variant="outlined">
          {props.buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
