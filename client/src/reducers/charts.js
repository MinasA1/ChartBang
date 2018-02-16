const charts = (state=[], action) => {
    switch(action.type) {
      case 'LOAD_CHARTS':
        return [...action.charts]
      case 'ADD_CHART':
        return [...state, action.chart]
      default:
        return state
    }
  };
  
  export default charts