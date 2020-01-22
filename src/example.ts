import {
  MetamaskProvider,
  buildGatewayConfig,
  NetworkKind
} from "@0xcert/ethereum-metamask-provider";
import {
  Client,
  Priority,
  ActionKind,
  GeneralAssetLedgerAbility
} from "@0xcert/client";
import { config } from "./config";

// We create a new instance of metamask provider.
const provider = new MetamaskProvider({
  gatewayConfig: buildGatewayConfig(NetworkKind.RINKEBY)
});

export async function init() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    await provider.enable();
  }

  config.client = new Client({
    provider,
    apiUrl: "https://api-staging.0xcert.org"
  });

  return config.client.init();
}

export async function createOrder() {
  const order = await config.client.createOrder(
    {
      automatedPerform: true,
      wildcardSigner: false,
      payerId: config.client.provider.accountId,
      signersIds: [config.client.provider.accountId],
      actions: [
        {
          kind: ActionKind.CREATE_ASSET,
          assetLedgerId: config.assetLedgerId,
          senderId: config.client.provider.accountId,
          receiverId: config.client.provider.accountId,
          id: "1",
          imprint:
            "4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877"
        },
        {
          kind: ActionKind.TRANSFER_VALUE,
          valueLedgerId: "0xDaD2363a110309a294973da86c9C3681154394Ff",
          senderId: config.client.provider.accountId,
          receiverId: config.client.provider.accountId, // Change with another account if you do not want to send to yourself.
          value: "100"
        },
        {
          kind: ActionKind.SET_ABILITIES,
          assetLedgerId: config.assetLedgerId,
          senderId: config.client.provider.accountId,
          receiverId: "0x44e44897FC076Bc46AaE6b06b917D0dfD8B2dae9", // Change to your accont, currently you are setting to 0xcert test account.
          abilities: [GeneralAssetLedgerAbility.ALLOW_CREATE_ASSET] // Ability for creating assets trough the API.
        }
      ]
    },
    Priority.LOW
  );

  config.orderRef = order.data.ref;
  return order;
}

export async function getOrderInfo() {
  return config.client.getOrder(config.orderRef);
}
