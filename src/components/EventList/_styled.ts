import { ColorKey } from "style/styledTheme";
import styled from "styled-components";

export const StyledEventCategory = styled.em<{ color: ColorKey }>`
  color: ${({ color, theme }) => theme.colors[color]};
`;

export const StyledNoEventsText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.m};
`;
