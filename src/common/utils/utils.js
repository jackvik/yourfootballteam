import store from '../../routes/store';
import {positions,validationMessages} from '../constants';
export const dispatchData = (type, data) => {
    store.dispatch({
        type: type,
        payload: data
    });
};

export const ValidationCheck = (selectedPlayers,setError,setSaveText) => {
    setError("");
    setSaveText("");
    if (!selectedPlayers.length) {
      setError("");
      return;
    }
    if (selectedPlayers.length > 16) {
      setError(validationMessages.TEAM_COUNT_ERROR);
      return false;
    }

    const groupByCountry = selectedPlayers.reduce((group, player) => {
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
    if (Object.values(groupByCountry).some((count) => count > 4)) {
      setError(validationMessages.SAME_NATIONALITY_COUNT_ERROR);
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
      setError(validationMessages.ATTACKER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.GOALKEEPER] ||
      groupByPosition[positions.GOALKEEPER] < 2
    ) {
      setError(validationMessages.GOALKEEPER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.DEFFENDER] ||
      groupByPosition[positions.DEFFENDER] < 4
    ) {
      setError(validationMessages.DEFENDER_COUNT_ERROR);
      return false;
    }
    if (
      !groupByPosition[positions.MIDFIELDER] ||
      groupByPosition[positions.MIDFIELDER] < 4
    ) {
      setError(validationMessages.MIDFIELDER_COUNT_ERROR);
      return false;
    }
    

    setError("");
    setSaveText(validationMessages.SUCCESS);
    return true;
  };
