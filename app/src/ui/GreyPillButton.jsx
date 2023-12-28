import styled from "styled-components";
import PillContainer from "./PillContainer";

const GreyPillButton = styled(PillContainer)`
  padding: 6px 22px;
  gap: 10px;
  color: var(--color-grey-0);
  text-align: center;
  background-color: var(--color-grey-5);
  text-transform: uppercase;
  &:hover {
    background-color: var(--color-grey-4);
  }
`;

export default GreyPillButton;
