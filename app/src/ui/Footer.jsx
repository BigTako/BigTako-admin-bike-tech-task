import styled from "styled-components";
import StyledGreyHeading from "./StyledGreyHeading";

const StyledFooter = styled(StyledGreyHeading)`
  justify-content: flex-end;
  align-items: center;
  font-weight: 400;
  padding: 10px;
`;

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

export default Footer;
