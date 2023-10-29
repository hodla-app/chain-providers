import styled from "styled-components";
import { elipsis } from "./mixins";
import { textS, primary, secondary } from "./tokens";
import React from "react";

const Text = styled.div`
  ${elipsis}
  ${textS};
  color: ${primary};
`;

const SecondaryText = styled(Text)`
  margin-top: 0.25rem;
  color: ${secondary};
`;

const Info = styled.div`
  margin-top: 2rem;
  min-width: 0;
  flex-grow: 1;
`;

export const Field = ({
  title,
  isLoading,
  subtitle,
  className,
}: {
  title?: string;
  isLoading?: React.ReactNode;
  subtitle: string;
  className?: string;
}) => {
  return (
    <Info className={className}>
      {title ? <Text>{title}</Text> : isLoading}
      <SecondaryText>{subtitle}</SecondaryText>
    </Info>
  );
};
