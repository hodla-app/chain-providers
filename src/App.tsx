import styled, { createGlobalStyle } from "styled-components";
import { bgDark, primary, textM } from "./common/tokens";
import { Headline1, Headline2, SecondaryText } from "./common/typography";
import { useState } from "react";
import { HistoryItem, StakeAccount } from "./types";
import { Button } from "./common/Button";
import { provider } from "./provider";
import { Input } from "./common/Input";
import { HistoryItemView } from "./common/HistoryItemView";

const GlobalStyled = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${bgDark};
    color: ${primary};
    ${textM};
    font-family: 'Montserrat', sans-serif;
    }

  html {
    font-size: 8px;
  }
`;

const Container = styled.div`
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  padding: 2rem;
`;

const Dilimeter = styled.div`
  padding-top: 2rem;
`;

function App() {
  const [walletAdress, setWalletAdress] = useState<string>();
  const [validatorAdress, setValidatorAdress] = useState<string>();
  const [stakeAccount, setStakeAccount] = useState<StakeAccount>();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  return (
    <>
      <GlobalStyled />
      <Container>
        <Headline1>Test your provider</Headline1>
        <Dilimeter />
        <Button
          stretch
          onClick={() => {
            provider.connect().then(({ address }) => setWalletAdress(address));
          }}
        >
          Connect wallet
        </Button>
        <Dilimeter />
        {walletAdress && (
          <>
            <SecondaryText>
              Your wallet address is: {walletAdress}
            </SecondaryText>
            <Dilimeter />
            <Headline2>Enter validator address bellow</Headline2>
            <Input
              onChange={({ target: { value } }) => setValidatorAdress(value)}
              value={validatorAdress}
            />
            <Dilimeter />
            <Button
              stretch
              view="primary"
              size="l"
              disabled={!validatorAdress}
              onClick={() => {
                if (!validatorAdress) {
                  return;
                }
                provider
                  .stake?.(walletAdress, 0.01, validatorAdress)
                  .then((res) => {
                    console.log(res);
                    return res;
                  })
                  .then(({ stakeAccount }) => setStakeAccount(stakeAccount));
              }}
            >
              Stake 0.01
            </Button>
            <Dilimeter />
            <Button
              stretch
              disabled={!validatorAdress}
              onClick={() => {
                if (!stakeAccount) {
                  return;
                }
                provider
                  .unstake?.(walletAdress, 0.01, stakeAccount.address)
                  .then((res) => {
                    console.log(res);
                    return res;
                  });
              }}
            >
              Untake 0.01
            </Button>
            <Dilimeter />
            <Button
              stretch
              disabled={!validatorAdress}
              onClick={() => {
                if (!stakeAccount) {
                  return;
                }
                provider.history(walletAdress).then(setHistory);
              }}
            >
              Update history
            </Button>
            <Dilimeter />
            <Headline2>History:</Headline2>
            <Dilimeter />
            <>
              {history.map((item) => {
                return <HistoryItemView key={item.txHash} item={item} />;
              })}
            </>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
