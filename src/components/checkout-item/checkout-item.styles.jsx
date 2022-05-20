import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  text-align: center;
  padding: 1rem 0;

  img {
    width: 75%;
  }
`;

export const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: max-content;
  justify-self: center;
`;

export const QuantityController = styled.span`
  font-weight: bold;
  font-size: 24px;
  transition: transform 125ms ease-in-out;

  &::selection {
    outline: none;
  }

  &:hover {
    transform: scale(1.25);
  }
`;

export const RemoveButton = styled.span`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 125ms ease-in-out;
  width: max-content;
  justify-self: center;

  &:hover {
    transform: scale(1.25);
  }
`;
