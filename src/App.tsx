import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal,
  } = useMainContract();

  const { tonConnectUI } = useTonConnect();

  const [connected, setConnected] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>("ajnfisbuvbuqweohbvueiwqbfvkahjsbvjkhbsdfvhkubqsoufvhb");

  const userPlatform = useCallback(() => {
    setPlatform(WebApp.platform === "unknown" ? null : WebApp.platform);
  }, []);

  const showPlatformInAlert = useCallback(() => {
    if (platform) {
      WebApp.showAlert(platform);
    }
  }, [platform]);

  const openScan = useCallback(() => {
    WebApp.showScanQrPopup({ text: "Scan some QR code" }, (code) => {
      setCode(code);
      WebApp.closeScanQrPopup();
    });
  }, []);

  useEffect(() => {
    userPlatform();
    setConnected(tonConnectUI.connected);

    tonConnectUI.onStatusChange((status) => {
      setConnected(status !== null);
    });
  }, [tonConnectUI, userPlatform]);

  return (
    <div>
      <div className="container">
        <div className="button-container">
          <h3>Contract Data:</h3>
          <TonConnectButton />
        </div>
        <div className="data-container">
          <b>Our contract Address:</b>
          <p>{contract_address}</p>
          <hr />
          <b>Our contract Owner:</b>
          <p>{owner_address?.toString()}</p>
          <hr />
          {contract_balance && (
            <>
              <b>Our contract Balance:</b>
              <p>{fromNano(contract_balance)}</p>
              <hr />
            </>
          )}
          {recent_sender && (
            <>
              <b>Recent sender:</b>
              <p>{recent_sender.toString()}</p>
              <hr />
            </>
          )}
          <div>
            <b>Counter Value:</b>
            <p>{counter_value ?? "Loading..."}</p>
            <hr />
          </div>
          {platform && (
            <>
              <div className="button-container">
                <b>Show platform</b>
                <button onClick={showPlatformInAlert}>Show</button>
              </div>
              <hr />
            </>
          )}

          <div className="button-container">
            <b>Show scanner</b>
            <button onClick={openScan}>Open</button>
          </div>

          {code && (
            <div>
              <b>Scanned code</b>
              <p>{code}</p>
            </div>
          )}
        </div>

        <h3>Contract actions: </h3>
        <div className="data-container">
          {connected ? (
            <>
              <p>Increment contract counter by 1</p>
              <button onClick={sendIncrement}>Increment</button>
              <hr />

              <p>Deposit contract balance by 1 TON</p>
              <button onClick={sendDeposit}>Deposit</button>
              <hr />

              <p>Withdrawal from contract balance 0.2 TON</p>
              <button onClick={sendWithdrawal}>Withdrawal</button>
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQDAbnsqALKAoQO5uS1qOI8X7OhkeDnv3hZiqg2VAqhPa6xN"
            target="_blank"
          >
            explorer
          </a>
          <br />
          <a href="https://github.com/evilcore29/ton_stepik_fe/" target="_blank">
            github
          </a>
          <div>{platform}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
