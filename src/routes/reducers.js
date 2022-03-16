import {SET_TEAMS_DATA,SET_MYTEAM_DATA,SET_PLAYERS_DATA} from './action-types';

const initialState = {
    teamsData: {
        isSuccess: false,
        data: []
    },
    myTeamData: {
        isSuccess: false,
        data: []
    },
    playersData: {
        isSuccess: false,
        data: []
    }
}

function rootReducer(state = initialState, action){
    let newState = {...state};
    switch (action.type){
        case SET_TEAMS_DATA:{
            newState.teamsData = action.payload;
            break;
        }
        case SET_MYTEAM_DATA: {
            newState.myTeamData = action.payload;
            break;
        }
        case SET_PLAYERS_DATA: {
            newState.playersData = action.payload;
            break;
        }
        default:{
            break;
        }
    }

    return newState;
}

export default rootReducer;