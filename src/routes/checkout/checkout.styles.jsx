import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 90vw;
  margin: 0 auto;
`;

export const Headers = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
`;

export const TotalPrice = styled.span`
  float: right;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 3rem;
`;
