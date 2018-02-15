const charts = (state=[], action) => {
    switch(action.type) {
      case 'LOAD_CHARTS':
        return [...action.charts]
      case 'ADD_CHART':
        return [action.chart, ...state]
      default:
        return state
    }
  };
  
  export default charts