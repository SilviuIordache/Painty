import React from "react";
export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [
        {
          name: 'Brush Tool',
          icon: 'fas fa-paint-brush'
        },
        {
          name: 'Eraser Tool',
          icon: 'fas fa-eraser'
        },
        {
          name: 'Paint Bucket Tool',
          icon: 'fas fa-fill-drip'
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
      color: 'black',
      backgroundColor: '#ebab34'
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