import styled from "styled-components";
import BikesMenu from "./BikesMenu";
import BikeCreateForm from "./BikeCreateForm";
import BikeStatsPannel from "./BikeStatsPannel";
import BikeCard from "./BikeCard";
import { useBikes } from "../features/bikes/useBikes";
import FullSizeContainer from "./FullSizeContainer";

const StyledPannelLayout = styled.main`
  display: grid;
  grid-template-columns: 639px 513px;
  grid-template-rows: 1fr 2fr;
  height: 616px;
`;

function PannelLayout() {
  const { isLoading, error, bikes } = useBikes();

  if (isLoading) {
    return (
      <FullSizeContainer>
        <h3>Loading...</h3>
      </FullSizeContainer>
    );
  }

  if (error) {
    return (
      <FullSizeContainer>
        <h3>{error.message}</h3>
      </FullSizeContainer>
    );
  }

  return (
    <StyledPannelLayout>
      <BikesMenu>
        {bikes?.length ? (
          bikes.map((bike) => <BikeCard bike={bike} key={bike.id} />)
        ) : (
          <FullSizeContainer>
            <h3>No bikes yet</h3>
          </FullSizeContainer>
        )}
      </BikesMenu>
      <BikeCreateForm />
      <BikeStatsPannel />
    </StyledPannelLayout>
  );
}

export default PannelLayout;
