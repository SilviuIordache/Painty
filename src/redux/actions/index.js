export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT',
  }
}

export const incrementCustom = num => {
  return {
    type: 'INCREMENT CUSTOM',
    payload: num
  }
}

// tool actions ( to move to separate file)
export const setBrushActive = () => {
  return {
    type: 'SET BRUSH ACTIVE'
  }
}

export const setEraserActive = () => {
  return {
    type: 'SET ERASER ACTIVE'
  }
}

export const setBucketActive = () => {
  return {
    type: 'SET BUCKET ACTIVE'
  }
}