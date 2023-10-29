import styled from "styled-components";
import { bgDark, bgLight, error, primary, secondary, textL } from "./tokens";

interface Props {
  value?: string;
  placeholder?: string;
  postfix?: string;
  type?: "number" | "text" | "email" | "password" | "search" | "tel" | "url";
  hasError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  stretch?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  inputMode?:
    | "text"
    | "email"
    | "search"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
}

const StyledInput = styled.input<Omit<Props, "hasError" | "stretch">>`
  color: ${({ value, disabled }) => (value && !disabled ? primary : secondary)};
  background: transparent;
  width: 100%;
  margin: 0;
  padding: 0;
  ${textL}
  font-family: inherit;

  border: none;
  outline: none;
`;

const PostfixContainer = styled.div`
  position: absolute;
  pointer-events: none;
  top: 2rem;
`;

const PostfixPlaceholder = styled.span<{ postfix?: string }>`
  color: transparent;
  position: relative;
  ${textL}

  &:after {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    white-space: pre;
    content: " ${({ postfix }) => postfix}";
    color: ${secondary};
  }
`;

const Container = styled.div<Pick<Props, "hasError" | "stretch">>`
  transition: border 0.2s;
  border: solid 1px ${({ hasError }) => (hasError ? error : bgLight)};
  border-radius: 2.5rem;
  background: ${bgLight};
  padding: 2rem 3rem;
  box-sizing: border-box;
  ${({ stretch }) => (stretch ? "width: 100%;" : "")};
  position: relative;
`;

export const Input: React.FC<Props> = ({
  className,
  postfix,
  disabled,
  ...restProps
}) => {
  return (
    <Container className={className} hasError={restProps.hasError}>
      <StyledInput {...restProps} disabled={disabled} />
      {postfix ? (
        <PostfixContainer>
          <PostfixPlaceholder postfix={postfix}>
            {restProps.value || restProps.placeholder}{" "}
          </PostfixPlaceholder>
        </PostfixContainer>
      ) : null}
    </Container>
  );
};

export type { Props as InputProps };
