import evr from "@stacks/wallet-sdk"
import pkg from "@stacks/transactions"
import dotenv from "dotenv"

const { generateWallet, getStxAddress } = evr;
const { createStacksPrivateKey, pubKeyfromPrivKey, privateKeyToString } = pkg;

dotenv.config();
const wallet = await generateWallet({
    secretKey: process.env.PRIVATE_KEY,
    password: "password"
});

export const myAddress = getStxAddress({
    account: wallet.accounts[0],
    TransactionVersion: 128
});

export const privkey = privateKeyToString(
    createStacksPrivateKey(wallet.accounts[0].stxPrivateKey)
);

export const pubkey = pubKeyfromPrivKey(wallet.accounts[0].stxPrivateKey);