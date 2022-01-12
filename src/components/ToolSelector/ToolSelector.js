import React from "react";
export default function Toolbar(props) {
  const tools = [
    {
      name: "Brush Tool",
      icon: "fas fa-paint-brush",
    },
    {
      name: "Eraser Tool",
      icon: "fas fa-eraser",
    },
    {
      name: "Paint Bucket Tool",
      icon: "fas fa-fill-drip",
    },
  ];

  const toolButtons = tools.map((tool, index) => {
    return (
      <ToolButton
        active={props.currentTool === tool.name}
        icon={tool.icon}
        name={tool.name}
        key={index}
        changeTool={props.changeTool}
      />
    );
  });
  return <div> {toolButtons} </div>;
}

function ToolButton(props) {
  let activeStyle;
  if (props.active) {
    activeStyle = {
      border: "2px solid black",
      color: "black",
      backgroundColor: "#ebab34",
    };
  }
  return (
    <button
      className="btn btn-outline-secondary"
      style={activeStyle}
      onClick={() => props.changeTool(props.name)}
    >
      <i className={props.icon}></i>
    </button>
  );
}
