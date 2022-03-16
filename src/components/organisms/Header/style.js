import styled from 'styled-components';
import { NavLink,} from 'react-router-dom';
export const FlexStyle = styled.header`
    position: sticky;
    display:flex;
    z-index: 10;
    top: 0;
    background-color: white;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
    nav{
      margin:5px 15px;
      display:flex;
      width:100%;
      justify-content:space-between;
    }
    ul{
      display:flex;
      list-style:none;
    li{
      a{
        text-decoration: none;
        padding:3px;
      }
    }}
    img{
      height:20px;
      width:30px;
    }
  `;

export const StyledLink = styled(NavLink)`
color: blue;

&.${props => props.activeClassName} {
  color: red;
}
`