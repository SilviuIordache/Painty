import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeTool, changeColor, changeBrushSize} from "../../../../redux/features/toolSlice"

export default function Toolbar() {
  const dispatch = useDispatch();
  const tools = [
    {
      name: "brush",
      icon: "fas fa-paint-brush",
      cb: () => {
        dispatch(changeTool("brush"))
      }
    },
    {
      name: "eraser",
      icon: "fas fa-eraser",
      cb: () => {
        dispatch(changeTool("eraser"));
        dispatch(changeColor("#FFFFFF"));
        dispatch(changeBrushSize(require("../../../../data/brushSizes.json").sizes[2]));
      }
    },
    {
      name: "bucket",
      icon: "fas fa-fill-drip",
      cb: () => {
        dispatch(changeTool("bucket"))
      }
    },
  ];

  const toolButtons = tools.map((tool, index) => {
    return (
      <ToolButton
        icon={tool.icon}
        name={tool.name}
        cb={tool.cb}
        key={index}
      />
    );
  });
  return <div> {toolButtons} </div>;
}

function ToolButton(props) {
  const currentToolType = useSelector(state => state.tool.type);

  let active = (currentToolType === props.name)
  let activeStyle = {
    width: '3.6rem',
    height: '3.6rem',
    fontSize: "1.3rem",
    marginRight: "0.2rem"
  }

  if (active) {
    activeStyle = {
      ...activeStyle,
      border: "2px solid black",
      color: "black",
      backgroundColor: "#ebab34",
    };
  }
  return (
    <button
      className="btn btn-outline-secondary"
      style={activeStyle}
      title={props.name}
      onClick={props.cb}
    >
      <i className={props.icon}></i>
    </button>
  );
}
