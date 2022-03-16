import React from 'react';
import ListItem from '../../molecules/ListItem';
import {FlexStyle} from './style';
function PlayersView(props) {
    let selectedPlayers = props.selectedPlayers;
    return (
    <FlexStyle>
    {selectedPlayers.length >0?<table>
    <thead>
      <tr>
        <th>Team</th>
        <th>Position</th>
        <th>Name</th>
        {props.isButton ?<th>Action</th>:null}
      </tr>
    </thead>
    <tbody>
            {selectedPlayers?.sort((a, b) => a.position > b.position ? 1 : b.position > a.position ? -1 : 0
                ).map((player) => {
                    return (
                        <ListItem 
                        player={player}
                        key={player.id+props.dataSelector}
                        type={props.type}
                        onSelected={props.clickHandler}
                        isButton={props.isButton}
                        />
                    )
                })}
        </tbody></table>: <p>No Player Has Been Selected Yet</p>}
    </FlexStyle>
  )
}

export default PlayersView;