import styled from 'styled-components';
import { NavLink,} from 'react-router-dom';
export const FlexStyle = styled.header`
    position: sticky;
    display:flex;
    z-index: 10;
    top: 0;
    background-color: white;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
    height:6rem;
    nav{
      margin:5px 15px;
      display:flex;
      width:100%;
      justify-content:space-between;
      h5{
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.2;
      }
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
      height:35px;
      width:51px;
    }
  `;

export const StyledLink = styled(NavLink)`
color: blue;

&.${props => props.activeClassName} {
  color: red;
}
`