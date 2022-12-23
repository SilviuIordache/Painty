import ColorSquare from "./ColorSquare";
import React, { useState } from "react";

export default function ColorGrid() {
  const [colors] = useState(require("../../../../../../data/colors.json").list);
  const colorsArray1 = colors.slice(0, 7);
  const colorsArray2 = colors.slice(7, 14);

  const colorsRow1 = colorsArray1.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        key={index}
        pos="top"
      />
    );
  });

  const colorsRow2 = colorsArray2.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        key={index}
        pos="bottom"
      />
    );
  });

  return (
    <div>
      <div className="d-flex">{colorsRow1}</div>
      <div className="d-flex">{colorsRow2}</div>
    </div>
  );
}
