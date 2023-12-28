import styled from "styled-components";
import StyledGreyHeading from "./StyledGreyHeading";

const StyledHeader = styled(StyledGreyHeading)`
  padding: 4px 16px;
  align-items: flex-start;
`;

function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
