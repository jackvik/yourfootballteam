import styled from "styled-components"; 

export const FlexStyle = styled.main`
    display: flex;
    flex-direction: column;
    th, td {
    padding: 0.25rem;
    text-align:center;
    z-index:3;
    .MuiButton-root{
        z-index:1;
    }
}
tr.red th {
    background: red;
    color: white;
}
tr.green th {
  background: green;
  color: white;
}
tr.purple th {
  background: purple;
  color: white;
}
th {
  background: white;
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
`
