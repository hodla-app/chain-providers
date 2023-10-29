import styled from "styled-components";
import { primary, secondary, success, textS } from "./tokens";
import { HistoryItem, HistoryItemType } from "../types";
import { elipsis } from "./mixins";

interface Props {
  item: HistoryItem;
}

const Cell = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  &:last-child() {
    margin-bottom: 0;
  }
`;

const Text = styled.div`
  ${elipsis}
  ${textS};
  color: ${primary};
`;

const SecondaryText = styled(Text)`
  margin-top: 0.25rem;
  color: ${secondary};
`;

const Amount = styled.div<{ isEarning: boolean }>`
  color: ${({ isEarning }) => (isEarning ? success : secondary)};
`;

const Info = styled.div`
  min-width: 0;
  flex-grow: 1;
`;

const ITEM_TYPE_TO_TITLE: Record<HistoryItemType, string> = {
  claim: "Claim of rewards",
  stake: "Staking",
  unstake: "Unstaking",
  withdraw: "Withdrawal",
  redelegate: "Redelegation",
} as const;

const EARNING_TYPES: HistoryItemType[] = ["withdraw", "claim"];

export const HistoryItemView: React.FC<Props> = ({ item }) => {
  const isEarning = EARNING_TYPES.includes(item.type);
  return (
    <Cell>
      <Info>
        <Text>{ITEM_TYPE_TO_TITLE[item.type]}</Text>
        <SecondaryText>
          {item.date ? new Date(item.date).toLocaleDateString() : null}
        </SecondaryText>
      </Info>
      <Amount isEarning={isEarning}>
        {`${isEarning ? "+" : ""}${item.balance}`}
      </Amount>
    </Cell>
  );
};
