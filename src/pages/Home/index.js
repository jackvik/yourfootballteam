import React,{useState,useEffect} from 'react';
import {getData} from '../../api/ApiManager';
import {END_POINT_TEAMS_URL,END_POINT_PLAYERS_URL} from '../../api/APIEndPoints';
import {dispatchData} from '../../common/utils/utils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {SET_TEAMS_DATA,SET_MYTEAM_DATA,SET_PLAYERS_DATA} from '../../routes/action-types';
import ListItem from '../../components/molecules/ListItem';
import store from '../../routes/store';
import {FlexStyle,FlexContainer,SectionTitle,TableWrapper}  from './style';
import {useSelector} from 'react-redux';
import MyTeam from '../MyTeam';
import {positions,validationMessages,ALL_PLAYERS_TITLE,MY_TEAM_SELECTION_TITLE} from '../../common/constants';
import Button from '@mui/material/Button';
function Home() {
  const [teamsData,setTeamsData] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState("");
  const [teamPlayers,setTeamPlayers] = useState([]);
  let selectedPlayers = useSelector((state) => state.myTeamData.data);
  const [hasError, setAddError] = useState("");
  const [saveText, setSaveText] = useState("");
  useEffect(() => {
    getData(END_POINT_TEAMS_URL,successCallback,exceptionCallback)
  },[])

  const successCallback = (response) => {
    const dataPayload = {
      isSuccess: true,
      data: response.teams
    };

    setTeamsData(response.teams);
    dispatchData(SET_TEAMS_DATA,dataPayload);
  }
  const validTeamSave = () => {
    setAddError("");
    setSaveText("");
    if (!selectedPlayers.length) {
      setAddError("");
      return;
    }
    if (selectedPlayers.length > 16) {
      setAddError(validationMessages.TEAM_COUNT_ERROR);
      return false;
    }

    const groupByTeam = selectedPlayers.reduce((group, player) => {
      if (group[player.country]) {
        return {
          ...group,
          [player.country]: group[player.country] + 1,
        };
      }
      return {
        ...group,
        [player.country]: 1,
      };
    }, {});
    if (Object.values(groupByTeam).some((count) => count > 4)) {
      setAddError(validationMessages.SAME_NATIONALITY_COUNT_ERROR);
      return false;
    }

    const groupByPosition = selectedPlayers.reduce((group, player) => {
      if (group[player.position]) {
        return {
          ...group,
          [player.position]: group[player.position] + 1,
        };
      }
      return {
        ...group,
        [player.position]: 1,
      };
    }, {});
    if (
      !groupByPosition[positions.ATTACKER] ||
      groupByPosition[positions.ATTACKER] < 2
    ) {
      setAddError(validationMessages.ATTACKER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.GOALKEEPER] ||
      groupByPosition[positions.GOALKEEPER] < 2
    ) {
      setAddError(validationMessages.GOALKEEPER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.DEFFENDER] ||
      groupByPosition[positions.DEFFENDER] < 4
    ) {
      setAddError(validationMessages.DEFENDER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.MIDFIELDER] ||
      groupByPosition[positions.MIDFIELDER] < 4
    ) {
      setAddError(validationMessages.MIDFIELDER_COUNT_ERROR);
      return false;
    }
    

    setAddError("");
    setSaveText(validationMessages.SUCCESS);
    return true;
  };

  const saveTeamHandler = () => {
    console.log("HEre");
    if (validTeamSave()) {
      console.log("Bingo")
      localStorage.setItem("my-team", JSON.stringify(selectedPlayers));
    }
  };
  const setTeamDropdownData = (data) => {
    return data?.sort((a, b) => (a.name > b.name ? 1 :b.name> a.name ? -1 : 0))
    .map((team) => {
      return (
        <MenuItem key={team.id} value={team.id}><img src={team.crestUrl} width={20} height={15} />{team.name}</MenuItem>
      )
    })
  }

  const exceptionCallback = (err) => {
    //console.log("error",error);
  }

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    getData(END_POINT_PLAYERS_URL+event.target.value,getPlayersSuccessCallback,getPlayersErrorCallback);
  }

  const getPlayersSuccessCallback = (response) => {
    let playersResponse = response.squad.map((player) => ({
      ...player,country: response.name
    }));
    const dataPayload = {
      isSuccess: true,
      data: playersResponse,
    };
    setTeamPlayers(playersResponse);
    dispatchData(SET_PLAYERS_DATA,dataPayload);

  }
  const getPlayersErrorCallback = (err) => {

  }

  const addButtonHandler = (player) => {
    let selectedPlayersData = [...store.getState().myTeamData.data,player];
    let payload = {
      isSuccess: true,
      data: selectedPlayersData
    }

    dispatchData(SET_MYTEAM_DATA,payload);
  }
  return (<>
      
      <FlexContainer>
        <FlexStyle>
        
        <SectionTitle>{ALL_PLAYERS_TITLE}</SectionTitle>
          <FormControl sx={{m:1,minWidth: 120}}>
            <InputLabel id="footballcountry">Team</InputLabel>
            <Select
            labelId="footballcountry"
            id="country-select"
            value={selectedCountry}
            label="Country"
            autoWidth
            onChange= {handleChange}
            >
              {setTeamDropdownData(teamsData)}
            </Select>
          </FormControl>
          {teamPlayers.length>0 ? <TableWrapper><table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Position</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {teamPlayers?.filter((player) => !selectedPlayers.map((item) => item.id).includes(player.id)).sort((a, b) =>a.position > b.position ? 1 : b.position> a.position ? -1 : 0
              ).map((player)=> {
                return (
                  <ListItem 
                    key={player.id}
                    player={player}
                    type={'ADD'}
                    onSelected={addButtonHandler}
                  />
                )
              })}
              </tbody>
          </table></TableWrapper> : <p>No data available</p>}
        </FlexStyle>
        <FlexStyle>
        <SectionTitle>{MY_TEAM_SELECTION_TITLE}</SectionTitle>
        <div><Button variant="contained" aria-label={'Save Team'} disabled={selectedPlayers.length===0} onClick={saveTeamHandler}>Save Team</Button>
        <p>{hasError}</p></div>
        <p>{saveText}</p>
        <MyTeam/>
        </FlexStyle>
      </FlexContainer>
    </>
    
  )
}

export default Home