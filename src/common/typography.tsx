import styled from "styled-components";
import { headline1, headline2, primary, secondary, textS } from "./tokens";

export const Headline1 = styled.h1`
  margin: 2rem 0;
  ${headline1}
`;

export const Headline2 = styled.h1`
  ${headline2}
`;

export const Text = styled.span`
  ${textS};
  color: ${primary};
`;

export const SecondaryText = styled(Text)`
  color: ${secondary};
`;
