const page = (state = 1, action) => {
    switch (action.type) {
        case 'NEXT_STEP':
            return state + 1
        case 'PREV_STEP':
            return state - 1
        case 'SET_STEP':
            return action.page
        default:
            return state
    }
};

export default page;