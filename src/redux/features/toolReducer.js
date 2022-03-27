export const toolReducer = (state, action) => {
  switch(action.type) {
    case 'SET BRUSH ACTIVE':
      return {
        ...state,
        name: 'Brush Tool'
      }
    case 'SET ERASER ACTIVE': 
      return {
      ...state,
      name: 'Eraser Tool'
      }
    case 'SET BUCKET ACTIVE':
      return {
        ...state,
        name: 'Paint Bucket Tool'
      }
    default:
      return {
        ...state,
        name: 'Brush Tool'
      }
  }
}