import styled, { css } from "styled-components";
import { forwardRef } from "react";
import { accent, bgDark, textS } from "./tokens";

interface Props extends React.PropsWithChildren {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: "s" | "l";
  view?: "primary" | "secondary";
  rounded?: boolean;
  stretch?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

const IconContainer = styled.div`
  display: inline-block;
  vertical-align: top;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:not(:first-child) {
    margin-left: 1rem;
  }

  &:only-child {
    margin: 0 -0.5rem;
  }
`;

const StyledButton = styled.button<Props>`
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  appearance: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  opacity: 1;

  height: 6rem;
  border-radius: 1.25rem;
  padding: 1.5rem 2rem;
  ${textS}
  color: ${bgDark};
  background: ${accent};
  width: 100%;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ""}

  transition: transform 0.2s,  opacity 0.2s;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      className,
      size = "s",
      view = "primary",
      rounded,
      disabled,
      stretch,
      iconLeft,
      iconRight,
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        onClick={onClick}
        className={className}
        size={size}
        view={view}
        rounded={rounded}
        disabled={disabled}
        stretch={stretch}
      >
        {iconLeft ? <IconContainer>{iconLeft}</IconContainer> : null}
        {children ? <Content>{children}</Content> : null}
        {iconRight ? <IconContainer>{iconRight}</IconContainer> : null}
      </StyledButton>
    );
  }
);
Button.displayName = "Button";
