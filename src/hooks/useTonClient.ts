import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { TonClient } from "ton";

export function useTonClient() {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" }),
      })
  );
}
