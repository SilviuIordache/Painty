import BrushSizeButton from './BrushSizeButton';

export default function BrushSizeSelector(props) {
  const sizes = require("../../jsons/brushSizes.json").sizes;

  const brushSizes = sizes.map((size, index) => {
    return (
      <BrushSizeButton
        active={size === props.currentBrushSize}
        key={index}
        size={size}
        selectBrushSize={props.selectBrushSize}
      />
    );
  });

  return <div className="d-flex justify-content-end">{brushSizes}</div>;
}