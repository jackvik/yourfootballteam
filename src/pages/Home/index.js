import React,{useState,useEffect} from 'react';
import {getData} from '../../api/ApiManager';
import {END_POINT_TEAMS_URL,END_POINT_PLAYERS_URL} from '../../api/APIEndPoints';
import {dispatchData, ValidationCheck} from '../../common/utils/utils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {SET_TEAMS_DATA,SET_MYTEAM_DATA,SET_PLAYERS_DATA} from '../../routes/action-types';
import PlayersView from '../../components/organisms/PlayersView';
import store from '../../routes/store';
import {FlexStyle,FlexContainer,SectionTitle,TableWrapper}  from './style';
import {useSelector} from 'react-redux';
import {ALL_PLAYERS_TITLE,MY_TEAM_SELECTION_TITLE,HomePageConstants} from '../../common/constants';
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
  
  const saveTeamHandler = () => {
    console.log("HEre");
    if (ValidationCheck(selectedPlayers,setAddError,setSaveText)) {
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

  const removeButtonHandler = (player) => {
    let modifiedData = [...selectedPlayers].filter((item) => item.id !== player.id);
    let payload = {
        isSuccess: true,
        data: modifiedData
    }
    dispatchData(SET_MYTEAM_DATA,payload);
}

  return (<>
      <FlexContainer>
        <FlexStyle>
        <SectionTitle>{ALL_PLAYERS_TITLE}</SectionTitle>
          <FormControl sx={{m:1,minWidth: 120}}>
            <InputLabel id={HomePageConstants.selectId}>{HomePageConstants.dropdownName}</InputLabel>
            <Select
            labelId={HomePageConstants.selectId}
            id={HomePageConstants.selectLabelel}
            value={selectedCountry}
            label={HomePageConstants.dropdownName}
            autoWidth
            onChange= {handleChange}
            >
              {setTeamDropdownData(teamsData)}
            </Select>
          </FormControl>
          {teamPlayers.length>0 ?<TableWrapper><PlayersView 
            isButton={true} 
            selectedPlayers={teamPlayers
              .filter(
                (player) => !selectedPlayers.map((sp) => sp.id).includes(player.id)
              )
              .sort((a, b) =>
                a.position > b.position ? 1 : b.position > a.position ? -1 : 0
              )} 
            clickHandler={addButtonHandler} 
            type={HomePageConstants.addBtn} 
            dataSelector={HomePageConstants.teamSelector}/>
            </TableWrapper> : <p>No data available</p>}
        </FlexStyle>
        <FlexStyle>
          <SectionTitle>{MY_TEAM_SELECTION_TITLE}</SectionTitle>
          <div>
            <Button 
              variant={HomePageConstants.btnVariant} 
              aria-label={HomePageConstants.saveBtn} 
              disabled={selectedPlayers.length===0} 
              onClick={saveTeamHandler}>
                {HomePageConstants.saveBtn}
            </Button>
          <p>{hasError}</p></div>
          <p>{saveText}</p>
          <TableWrapper>
            <PlayersView 
              isButton={true} 
              selectedPlayers={selectedPlayers} 
              clickHandler={removeButtonHandler} 
              type={HomePageConstants.rmvBtn} 
              dataSelector={HomePageConstants.myTeamSelector}/>
          </TableWrapper>  
        </FlexStyle>
      </FlexContainer>
    </>
  )
}

export default Home