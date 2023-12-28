import { useState } from "react";
import styled from "styled-components";
import { useDeleteBike, useUpdateBike } from "../features/bikes/useBikes";
import GreyPillButton from "./GreyPillButton";
import { Modal, useModalContext } from "./Modal";
import StyledAboveCover from "./StyledAboveCover";
import StyledCloseButton from "./StyledCloseButton";
import StyledStack from "./StyledStack";

const StyledBikeCard = styled.div`
  position: relative;

  ${(props) =>
    props.status === "unavailable" &&
    `
    ::before {
      zIndex: -1;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.155);
      border-radius: 10px;
    }
  `}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  gap: 4px;
  color: var(--color-grey-6);
  background-color: var(--color-grey-1);
  border-radius: 10px;
  padding: var(--card-top-bottom-padding) var(--card-left-right-padding);
  border: 2px solid
    ${({ status }) =>
      status === "available"
        ? "var(--color-green-0)"
        : status === "busy"
        ? "var(--color-red-0)"
        : "var(--color-red-1)"};
  strong {
    color: var(--color-grey-7);
  }
`;

const StyledSelect = styled.select`
  font-size: 14px;
  border: none;
  background-color: transparent;
  font-family: inherit;
  cursor: pointer;
  z-index: inherit;
`;

function ConfirmDeleteWindow({ onConfirm }) {
  const { close } = useModalContext();
  return (
    <StyledStack type="column" gap="16px">
      <h3>
        <strong>Confirm delete</strong>
      </h3>
      <h4>Are you sure you want to delete this information?</h4>
      <GreyPillButton
        as="button"
        onClick={() => {
          onConfirm();
          close();
        }}
      >
        confirm
      </GreyPillButton>
    </StyledStack>
  );
}

function BikeCard({ bike }) {
  const { id, name, type, color, status: bikeStatus, price } = bike;
  const [status, setStatus] = useState(bikeStatus);
  const { isDeleting, deleteBike } = useDeleteBike();
  const { isUpdating, updateBike } = useUpdateBike();

  const disabled = isDeleting || isUpdating;

  return (
    <>
      <StyledBikeCard status={status}>
        <Modal.Open opens={"delete-confirm-window"}>
          <StyledCloseButton as="button" disabled={disabled}>
            <strong>╳</strong>
          </StyledCloseButton>
        </Modal.Open>
        <StyledStack type="column" gap="6px" align="start">
          <h4>
            <strong>{name}</strong>-{type}({color})
          </h4>
          <h5>ID:{id}</h5>
        </StyledStack>
        <StyledStack type="row" align="center" justify="end">
          <StyledAboveCover
            style={{
              left: "var(--card-left-right-padding)",
            }}
          >
            <StyledStack type="row" gap="18px" align="start">
              <h4 style={{ zIndex: "inherit" }}>STATUS: </h4>
              <StyledSelect
                disabled={disabled}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  updateBike({ newData: { status: e.target.value }, id });
                }}
              >
                <option value={"available"}>Available</option>
                <option value={"busy"}>Busy</option>
                <option value={"unavailable"}>Unavailable</option>
              </StyledSelect>
            </StyledStack>
          </StyledAboveCover>

          <h1>{price} UAH/hr</h1>
        </StyledStack>
      </StyledBikeCard>
      <Modal.Window name={"delete-confirm-window"}>
        <ConfirmDeleteWindow onConfirm={() => deleteBike(bike.id)} />
      </Modal.Window>
    </>
  );
}
export default BikeCard;
