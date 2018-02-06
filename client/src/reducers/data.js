const saveSchema = (schema) => {
  console.log(schema);
  localStorage.setItem('schema', JSON.stringify(schema));
}
export const loadSchema = () => {
  try {
    let schema = localStorage.getItem('schema');
    return JSON.parse(schema);
  } catch(e) {
    return undefined;
  }
};

const data = (state=[], action) => {
  switch(action.type) {
    case "LOAD_DATA":
      return [...action.messages];
    case "ADD_DATA":
      return [action.message, ...state];
    case 'SET_SCHEMA':
      saveSchema(action.schema);
      return {...action.schema};
    default:
      return state;
  }
};

export default data;
