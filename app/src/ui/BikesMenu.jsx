import styled from "styled-components";

const StyledBikesMenu = styled.div`
  grid-row: 1/3;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 639px;
  max-height: 100%;
  padding: 9px;
  overflow-y: auto;
`;

function BikesMenu({ children }) {
  return <StyledBikesMenu>{children}</StyledBikesMenu>;
}
export default BikesMenu;
