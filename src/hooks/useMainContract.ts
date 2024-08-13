import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";

export function useMainContract() {
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();

  const [balance, setBalance] = useState<null | number>(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const parsedAddress = Address.parse("EQDAbnsqALKAoQO5uS1qOI8X7OhkeDnv3hZiqg2VAqhPa6xN");
    console.log("🚀 ~ file: useMainContract.ts:22 ~ mainContract ~ parsedAddress:", parsedAddress.toString());

    const contract = new MainContract(parsedAddress);
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const contractData = await mainContract.getData();
      const contractBalance = await mainContract.getBalance();
      setContractData({
        counter_value: contractData.number,
        recent_sender: contractData.recent_sender,
        owner_address: contractData.owner_address,
      });
      setBalance(contractBalance);
    }

    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
  };
}
