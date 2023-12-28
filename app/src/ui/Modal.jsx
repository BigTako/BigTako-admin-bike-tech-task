import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import StyledCloseButton from "./StyledCloseButton";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 100000;
  transition: all 0.5s;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <StyledCloseButton as="button" onClick={close}>
          <strong>╳</strong>
        </StyledCloseButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside ModalProvier");
  return context;
}

export { Modal, useModalContext };
