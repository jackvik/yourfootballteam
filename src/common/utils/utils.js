import store from '../../routes/store';
import {positions,validationMessages} from '../constants';
export const dispatchData = (type, data) => {
    store.dispatch({
        type: type,
        payload: data
    });
};

export const ValidationCheck = (selectedPlayers,setAddError,setSaveText) => {
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
