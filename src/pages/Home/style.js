import styled from "styled-components"; 

export const FlexStyle = styled.section`
    display: flex;
    flex-direction: column;
    width:45%;
`
export const TableWrapper = styled.div`
    max-height:80%;
    overflow-y:auto;
    table{
      width:100%;
    }
`
export const SectionTitle = styled.h2``;
export const FlexContainer = styled.div`
    height:calc(100vh - 7rem);
    display: flex;
    flex-direction: row;
    flex-basis: 45%;
    justify-content: space-between;
    margin:5px 15px;
    table {
      text-align: left;
      position: relative;
      border-collapse: collapse; 
}
button{
    height:fit-content;
}
th, td {
  padding: 0.25rem;
  text-align:center;
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