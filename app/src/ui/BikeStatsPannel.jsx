import styled from "styled-components";
import { useBikesStats } from "../features/bikes/useBikes";
import FullSizeContainer from "./FullSizeContainer";

const StyledBikeStatsPannel = styled.div`
  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

function BikeStatsPannel() {
  const { isLoading, error, bikesStats } = useBikesStats();

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

  const { totalCount, availableCount, busyCount, averagePrice } =
    bikesStats || {};
  return (
    <StyledBikeStatsPannel>
      <strong>
        <h3>STATISTICS</h3>
      </strong>
      <h4>
        Total Bikes: <strong>{totalCount || "0"}</strong>
      </h4>
      <h4>
        Available Bikes: <strong>{availableCount || "0"}</strong>
      </h4>
      <h4>
        Booked Bikes: <strong>{busyCount || "0"}</strong>
      </h4>
      <h4>
        Averate bike cost: <strong>{averagePrice || "00.0"}</strong> UAH/hr
      </h4>
    </StyledBikeStatsPannel>
  );
}

export default BikeStatsPannel;
