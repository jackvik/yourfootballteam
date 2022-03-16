import store from '../../routes/store';
export const dispatchData = (type, data) => {
    store.dispatch({
        type: type,
        payload: data
    });
};