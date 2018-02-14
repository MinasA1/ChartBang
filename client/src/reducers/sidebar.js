const sidebar = (state=false, action) => {
    switch(action.type) {
      case 'TOGGLE':
        return !state;
       default:
        return state;
    }
  };
  
  export default sidebar;
  