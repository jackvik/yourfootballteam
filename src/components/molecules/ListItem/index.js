import React from 'react';
import Button from '@mui/material/Button';
const ListItem = (props) =>{
    const onClickHandler = () => {
        props.onSelected(props.player);
    }

    return (
            <tr>
                <td>{props.player.country}</td>
                <td>{props.player?.position?.substring(0,3).toUpperCase()}</td>
                <td>{props?.player?.name}</td>
                {props.isButton ?<td><Button variant="contained" onClick={onClickHandler}>{props.type}</Button></td> : null}
            </tr>
    )
}

export default ListItem;