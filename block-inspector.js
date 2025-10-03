const { ethers } = require("ethers");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;

if (!RPC_URL) {
    console.error("RPC_URL not found in .env file.");
    process.exit(1);
}

async function inspectBlock() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        console.log("Fetching latest block...");

        const latestBlock = await provider.getBlock('latest');

        console.log("\n--- Latest Block Details ---");
        console.log(`Block Number: ${latestBlock.number}`);
        console.log(`Timestamp:    ${new Date(latestBlock.timestamp * 1000).toLocaleString()}`);
        console.log(`Gas Used:     ${latestBlock.gasUsed.toString()}`);
        console.log(`Base Fee:     ${ethers.utils.formatUnits(latestBlock.baseFeePerGas, 'gwei')} Gwei`);
        console.log(`Hash:         ${latestBlock.hash}`);
        console.log("--------------------------");

    } catch (error) {
        console.error("Error fetching block data:", error.message);
    }
}

inspectBlock();
