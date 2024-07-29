import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const BlockchainIntegration = {
    sdk: null,
    contract: null,

    async init() {
        // Initialize ThirdwebSDK (replace with your chain and private key)
        this.sdk = new ThirdwebSDK("ethereum", {
            privateKey: process.env.PRIVATE_KEY,
        });

        // Get the contract instance (replace with your contract address)
        this.contract = await this.sdk.getContract(process.env.CONTRACT_ADDRESS);
    },

    async getBalance(address) {
        const balance = await this.contract.erc20.balanceOf(address);
        return balance.displayValue;
    },

    async mintTokens(address, amount) {
        try {
            const result = await this.contract.erc20.mint(address, amount);
            console.log("Tokens minted:", result);
            return result;
        } catch (error) {
            console.error("Error minting tokens:", error);
        }
    }
};

export default BlockchainIntegration;
