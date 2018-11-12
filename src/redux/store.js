import {createStore} from 'redux';

/********************
 * Initial state    *
 ********************/
let initialState = {
    products:[],
    users: [],
    reviews: []
};

/***********
 * Reducer *
 ***********/
/* Actions ALWAYS have the following object structure (where the payload has to be an object)

        {
            type:String,
            payload: { success:any, id:any, anythingElse:any ...}
        }
*/

function reducer(state, action)
{
    switch(action.type)
    {
        case 'setAllProducts':
            return {...state, products: action.payload.products};

        case 'setAllUsers':
            return {...state, users: action.payload.users};
            
        case 'setAllReviews':
            return {...state, reviews: action.payload.reviews};

        default:
            return state;
    }
}


/**************************
 * Create the store and
 * export the module
 *************************/
let store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store; 