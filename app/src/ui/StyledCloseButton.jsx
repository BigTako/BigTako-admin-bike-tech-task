import styled from "styled-components";
import StyledAboveCover from "./StyledAboveCover";

const StyledCloseButton = styled(StyledAboveCover)`
  top: 12px;
  right: 18px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  &:hover {
    background-color: var(--color-grey-2);
  }
`;

export default StyledCloseButton;
