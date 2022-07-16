import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import getDailyWord from '../../helpers/getDailyWord';

export default function BasicCard(props) {
  const navigate = useNavigate();

  const cardStyle = {
    textAlign: "left",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const [dailyWord] = useState(getDailyWord());

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          Daily timed drawing
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {dailyWord}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={() => {navigate('/draw/challenge')}} variant="contained">
          PLAY
        </Button>
      </CardActions>
    </Card>
  );
}
