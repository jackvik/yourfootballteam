import React from 'react'
import {useSelector} from 'react-redux';
import ListItem from '../../components/molecules/ListItem';
import {dispatchData} from '../../common/utils/utils';
import {SET_MYTEAM_DATA} from '../../routes/action-types';
import {FlexStyle} from './style';
function MyTeam() {
    let selectedPlayers = useSelector((state)=> state.myTeamData.data);
    
    const removeButtonHandler = (player) => {
        let modifiedData = [...selectedPlayers].filter((item) => item.id !== player.id);
        let payload = {
            isSuccess: true,
            data: modifiedData
        }
        dispatchData(SET_MYTEAM_DATA,payload);
    }
    return (
    <FlexStyle>
    {selectedPlayers.length >0?<table>
    <thead>
      <tr>
        <th>Team</th>
        <th>Position</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            {selectedPlayers?.sort((a, b) => a.position > b.position ? 1 : b.position > a.position ? -1 : 0
                ).map((player) => {
                    return (
                        <ListItem 
                        player={player}
                        key={player.id+'MyTeam'}
                        type={'REMOVE'}
                        onSelected={removeButtonHandler}
                        />
                    )
                })}
        </tbody></table>: <p>No Player Has Been Selected Yet</p>}
    </FlexStyle>
  )
}

export default MyTeam