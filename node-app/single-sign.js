import net from "@stacks/network";
import tr from "@stacks/transactions";
import { myAddress, privkey } from "./wallet.js";

const { StacksDevnet } = net;

const {
    broadcastTransaction,
    makeContractCall,
    getNonce,
    AnchorMode,
    Pc,
    PostConditionMode,
    Cl
} = tr;
 

const devnet = new StacksDevnet({
    url:
        "https://api.platform.hiro.so/v1/ext/"+
        process.env.API_KEY +
        "/stacks-blockchain-api"
});

let nonce = await getNonce(myAddress, devnet);

let amountToSend = Cl.uint(3000000); // this is like 3 stx

let postCondition1 = Pc.principal(myAddress).willSendEq(3000000).ustx();

let transaction = await makeContractCall({
    contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractName: "postConditionTest",
    functionName: "donate",
    functionArgs: [amountToSend],
    fee: 300n,
    nonce,    
    network: devnet,
    senderKey: privkey,
    anchorMode: AnchorMode.OnChainOnly,
    postConditions: [postCondition1],
    postConditionMode: PostConditionMode.Deny,
});

let result = await broadcastTransaction(transaction, devnet);
console.log(result);