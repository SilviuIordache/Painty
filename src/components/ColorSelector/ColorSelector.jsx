import React, { useState } from "react";
import ColorGrid from "./ColorGrid";

export default function ColorSelector(props) {
  const [colors] = useState(require("../../jsons/colors.json").list);

  return (
    <div>
      <ColorGrid colors={colors}/>
    </div>
  );
}
