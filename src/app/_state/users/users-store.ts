import { UserState, users } from "@app/_shared/models/user.interface";
import { createAction, createReducer, on, props } from "@ngrx/store";


const userState: UserState = {
    user: [],
    loadingFlag: false
}

export const loadUserData = createAction('Load User Data');

export const loadUserDataSuccess = createAction('Load User Data Success', props<{ userData: users[] }>())

export const loadingSpinner = createAction('Loading Spinner', props<{ isLoading: boolean }>())

export const editLoadUserData = createAction('Edit Load User Data', props<{ userData: users }>())


const _UsersReducer = createReducer(userState, on(loadUserDataSuccess, (state: UserState, action: any) => {
    return {
        ...state,
        user: action
    }
}),
    on(loadingSpinner, (state: UserState, action: any) => {
        return {
            ...state,
            loadingFlag: action.isLoading
        }
    }), on(editLoadUserData, (state: any, action: any) => {
        let userStateData = { ...state.user };
        delete userStateData.type;

        for (let key in userStateData) {
            if (userStateData[key].id === action.userData.id) {
                let updateUserData = { ...userStateData[key], firstName: action.userData.firstName, password: action.userData.password, email: action.userData.email, username: action.userData.username }
                delete userStateData[key];
                return { ...state, user: { ...userStateData, [key]: updateUserData } }
            }
        }
    }),)

export function UsersReducer(state: any, action: any) {
    return _UsersReducer(state, action)
}


