import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.s} ${({ theme }) => theme.spacings.l};
  max-width: 1366px;
  margin: 0 auto;
`;

export const StyledPageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
`;

export const StyledCenterdButton = styled.button`
  margin: 0 auto;
  display: block;
`;
