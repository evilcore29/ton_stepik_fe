import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";

function App() {
  const { contract_address, counter_value, recent_sender, owner_address, contract_balance } = useMainContract();
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address}</div>
          <b>Our contract Owner</b>
          <div className="Hint">{owner_address?.toString()}</div>
          <b>Our contract Balance</b>
          <div className="Hint">{contract_balance}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
