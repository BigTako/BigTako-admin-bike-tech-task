import styled from "styled-components";
import { useForm } from "react-hook-form";
import GreyPillButton from "./GreyPillButton";
import PillContainer from "./PillContainer";
import { useCreateBike } from "../features/bikes/useBikes";

export const StyledForm = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
  align-self: start;
`;

export const StyleFormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 11px;
`;

export const StyledTextAreaContainer = styled(PillContainer)`
  display: flex;
  padding: 5px 16px;
  gap: 10px;
  background: var(--color-grey-1);
`;

export const StyledTextArea = styled.textarea`
  display: flex;
  font-family: inherit;
  width: 100%;
  background-color: inherit;
  resize: none;
`;

export const StyledInput = styled(PillContainer)`
  padding: 8px 16px;
  background-color: var(--color-grey-1);
  font-size: 12px;
`;

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

function FormField({ error, children }) {
  return (
    <StyledFormField>
      {children}
      {error && <StyledErrorMessage>{error.message}</StyledErrorMessage>}
    </StyledFormField>
  );
}

const StyledErrorMessage = styled.h5`
  color: var(--color-red-1);
`;

function BikeCreateForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createBike } = useCreateBike();

  function onSubmit(data) {
    createBike(data, {
      onSettled: () => reset(),
    });
  }

  const disabled = isCreating;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyleFormRow>
        <FormField error={errors.name}>
          <StyledInput
            as="input"
            type="text"
            disabled={disabled}
            placeholder="Name"
            {...register("name", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Minimal length is 5",
              },
              maxLength: {
                value: 256,
                message: "Maximal length is 256",
              },
            })}
          />
        </FormField>

        <FormField error={errors.type}>
          <StyledInput
            as="input"
            type="text"
            disabled={disabled}
            placeholder="Type"
            {...register("type", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Minimal length is 5",
              },
              maxLength: {
                value: 256,
                message: "Maximal length is 256",
              },
            })}
          />
        </FormField>
      </StyleFormRow>

      <StyleFormRow>
        <FormField error={errors.color}>
          <StyledInput
            as="input"
            type="text"
            disabled={disabled}
            placeholder="Color"
            {...register("color", {
              required: "This field is required",
              maxLength: {
                value: 256,
                message: "Maximal length is 256",
              },
            })}
          />
        </FormField>

        <FormField error={errors.wheelSize}>
          <StyledInput
            as="input"
            disabled={disabled}
            defaultValue={10}
            type="number"
            placeholder="Wheel size"
            {...register("wheelSize", {
              required: "This field is required",
              min: {
                value: 10,
                message: "Minimal wheelSize is 10",
              },
              max: {
                value: 100,
                message: "Maximal wheel size is 100",
              },
            })}
          />
        </FormField>
      </StyleFormRow>

      <StyleFormRow>
        <FormField error={errors.price}>
          <StyledInput
            as="input"
            disabled={disabled}
            defaultValue={100}
            type="number"
            placeholder="Price"
            {...register("price", {
              required: "This field is required",
              min: {
                value: 100,
                message: "Minimal price is 100",
              },
              max: {
                value: 10000,
                message: "Maximal price is 10000",
              },
            })}
          />
        </FormField>

        <FormField error={errors.id}>
          <StyledInput
            as="input"
            disabled={disabled}
            type="text"
            placeholder="ID(slug): XXXXXXXXXXXXXXXX"
            {...register("id", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Minimal length is 5",
              },
              maxLength: {
                value: 256,
                message: "Maximal length is 256",
              },
            })}
          />
        </FormField>
      </StyleFormRow>

      <StyleFormRow>
        <FormField error={errors.description}>
          <StyledTextAreaContainer>
            <StyledTextArea
              rows="5"
              disabled={disabled}
              type="textarea"
              placeholder="Description"
              {...register("description", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Minimal length is 5",
                },
                maxLength: {
                  value: 1024,
                  message: "Maximal length is 1024",
                },
              })}
            />
          </StyledTextAreaContainer>
        </FormField>
      </StyleFormRow>

      <StyleFormRow>
        <GreyPillButton
          as="button"
          disabled={disabled}
          onClick={handleSubmit(onSubmit)}
        >
          {disabled ? "loading..." : "save"}
        </GreyPillButton>
        <GreyPillButton
          as="button"
          disabled={disabled}
          onClick={() =>
            reset({
              name: "",
              type: "",
              color: "",
              wheelSize: 10,
              price: 100,
              id: "",
              description: "",
            })
          }
        >
          {disabled ? "loading..." : "clear"}
        </GreyPillButton>
      </StyleFormRow>
    </StyledForm>
  );
}
export default BikeCreateForm;
