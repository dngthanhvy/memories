import * as api from '../api';
import { AUTH } from '../constants/actionsTypes';

export const signin = (formData, history) => async(dispatch) => {

    try {

        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data })

        history.push('/');

    } catch (e) {

        console.log(e.message);
    }
};

export const signup = (formData, history) => async(dispatch) => {

    try {

        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data })

        history.push('/');

    } catch (e) {

        console.log(e.message);
    }
};
