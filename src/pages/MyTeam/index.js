import React,{useState,useEffect} from 'react'
import {FlexStyle} from './style';
import PlayersView from '../../components/organisms/PlayersView';
function MyTeam() {
      
      const [teamPlayers,setTeamPlayers] = useState([]);
      useEffect(()=>{
        if(localStorage.getItem("my-team")!=null){
          setTeamPlayers(JSON.parse(localStorage.getItem("my-team")));
        }
      },[setTeamPlayers])
    return (
    <FlexStyle>
    {teamPlayers && teamPlayers.length >0 ? <PlayersView isButton={false} 
    selectedPlayers={teamPlayers} 
    dataSelector={"AdidasTeam"}/>:<p>Team has not been created yet</p>}
    </FlexStyle>
  )
}

export default MyTeam