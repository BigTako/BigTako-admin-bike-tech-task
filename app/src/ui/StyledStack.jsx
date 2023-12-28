import styled from "styled-components";

const StyledStack = styled.div`
  display: inline-flex;
  flex-direction: ${(props) => props.type};
  align-items: ${(props) =>
    props.align === "start"
      ? "flex-start"
      : props.align === "end"
      ? "flex-end"
      : "center"};
  justify-content: ${(props) =>
    props.justify === "start"
      ? "flex-start"
      : props.justify === "end"
      ? "flex-end"
      : "center"};
  gap: ${(props) => props.gap};
  z-index: inherit;
`;

export default StyledStack;
