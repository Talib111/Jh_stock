// import {BUY_CAKE} from './cakeType';
// import {BUY_CAKE} from './cakeAction';

// const [intst, setintst] = useState(10)

const initialState = {
    User_email: "",
    Admin_user:false
}


const Data_reducer = (state = initialState, action)=>{
    // if(state.numofCakes==15){
    //     state.numofCakes=10;
    // }
    switch(action.type){
        // case BUY_CAKE: return {
            case "USER_EMAIL": return {
            ...state,
            User_email: action.user_email
        }
        case "ADMIN_USER": return {
            ...state,
            Admin_user: action.form_dt2
        }
       
        default: return state
    }
}

export default Data_reducer