import { css, keyframes } from "styled-components";

const loading = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100vw);
    }
`;

export const applySkeletonGradient = ({ dark }: { dark?: boolean }) => {
  const color1 = dark ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.01)";
  const color2 = dark ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.03)";

  return css`
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      animation: ${loading} 2s linear infinite;
      background-image: linear-gradient(
        90deg,
        ${color2},
        ${color1} 25%,
        ${color2} 50%,
        ${color1} 75%,
        ${color2} 100%
      );
      top: 0;
      left: -100vw;
      width: 200vw;
      height: 100%;
    }
  `;
};

export const elipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
