import React from "react";
export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [
        {
          name: 'brush',
          icon: 'fas fa-paint-brush'
        },
        {
          name: 'eraser',
          icon: 'fas fa-eraser'
        }
      ]
    }
  }
  render() {
    const tools = this.state.tools.map((tool, index) => {
      return (
        <ToolButton
          active={this.props.currentTool === tool.name}
          icon={tool.icon}
          name={tool.name}
          key={index}
          changeTool={this.props.changeTool}
        />
      )
    })
    return (
      <div>
        {tools}
      </div>
    )
  }
}

function ToolButton(props) {
  let activeStyle;
  if (props.active) {
    activeStyle = {
      border: '2px solid black',
      color: 'black'
    } 
  }
  return (
    <button 
      className="btn btn-outline-secondary"
      style={activeStyle}
      onClick={() => props.changeTool(props.name)}
    >
      <i className={props.icon}></i>
    </button>
  )
}