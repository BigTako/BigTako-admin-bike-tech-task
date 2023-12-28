import styled from "styled-components";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import MainLogo from "./ui/MainLogo";
import PannelLayout from "./ui/PannelLatyout";
import { Modal } from "./ui/Modal";

const AppLayout = styled.main`
  width: 1152px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
`;

function App() {
  return (
    <Modal>
      <AppLayout>
        <Header>
          <MainLogo />
        </Header>
        <PannelLayout />
        <Footer>
          <h2 style={{ color: "var(--color-grey-2)" }}>Developer:</h2>
          <h2 style={{ color: "var(--color-grey-0)" }}>
            Alexander Shcherbatov
          </h2>
        </Footer>
      </AppLayout>
    </Modal>
  );
}

export default App;
