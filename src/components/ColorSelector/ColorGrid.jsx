import ColorSquare from "./ColorSquare";

export default function ColorGrid(props) {
  const colorsArray1 = props.colors.slice(0, 7);
  const colorsArray2 = props.colors.slice(7, 14);

  const colorsRow1 = colorsArray1.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        key={index}
      />
    );
  });

  const colorsRow2 = colorsArray2.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        key={index}
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
