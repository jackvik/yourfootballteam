import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
const ListItem = (props) =>{
    const onClickHandler = () => {
        props.onSelected(props.player);
    }

    return (
            <tr>
                <td>{props.player.country}</td>
                <td>{props.player?.position?.substring(0,3).toUpperCase()}</td>
                <td>{props?.player?.name}</td>
                <td><Button variant="contained" onClick={onClickHandler}>{props.type}</Button></td>
            </tr>
    )
}

export default ListItem;