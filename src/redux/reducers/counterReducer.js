export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT CUSTOM':
      return state + action.payload
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}