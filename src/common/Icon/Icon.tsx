import { forwardRef, useMemo } from "react";
import styled from "styled-components";

import change from "./icons/change.svg";
import coins from "./icons/coins.svg";
import chevronLeft from "./icons/chevron-left.svg";
import chevronDown from "./icons/chevron-down.svg";
import chevronUp from "./icons/chevron-up.svg";
import plus from "./icons/plus.svg";
import gift from "./icons/gift.svg";
import check from "./icons/check.svg";
import more from "./icons/more.svg";
import copy from "./icons/copy.svg";
import rename from "./icons/rename.svg";
import trash from "./icons/trash.svg";
import grab from "./icons/grab.svg";
import history from "./icons/history.svg";
import verification from "./icons/verification.svg";
import wallet from "./icons/wallet.svg";
import listUp from "./icons/list-up.svg";
import listDown from "./icons/list-down.svg";
import link from "./icons/link.svg";
import discord from "./icons/discord.svg";
import github from "./icons/github.svg";
import medium from "./icons/medium.svg";
import substack from "./icons/substack.svg";
import twitter from "./icons/twitter.svg";
import warningStar from "./icons/warning-star.svg";
import send from "./icons/send.svg";
import swap from "./icons/swap.svg";

export const ICONS = {
  chevronLeft,
  chevronDown,
  chevronUp,
  coins,
  change,
  plus,
  gift,
  check,
  more,
  copy,
  rename,
  trash,
  grab,
  history,
  verification,
  wallet,
  listUp,
  listDown,
  link,
  discord,
  github,
  medium,
  substack,
  twitter,
  warningStar,
  send,
  swap,
} as const;

export type IconType = keyof typeof ICONS;

const IconContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 3rem;
  height: 3rem;
  color: inherit;
`;
interface Props {
  type: IconType;
  onClick?: () => void;
  className?: string;
}

export const Icon = forwardRef<HTMLDivElement, Props>(
  ({ type, className, onClick }, ref) => {
    const Component = useMemo(() => ICONS[type], [type]);
    return (
      <IconContainer ref={ref} className={className} onClick={onClick}>
        <Component />
      </IconContainer>
    );
  }
);
Icon.displayName = "Icon";
