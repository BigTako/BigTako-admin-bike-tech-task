import styled from "styled-components";

const StyledMainLogo = styled.div`
  font-family: "Saira Stencil One", cursive;
  font-size: 2.4rem;
  color: var(--color-grey-1);
`;

function MainLogo() {
  return <StyledMainLogo>ADMIN.BIKE-BOOKING.COM</StyledMainLogo>;
}
export default MainLogo;
