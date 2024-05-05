

// Connect to Sepolia node
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/bcf3365e460b4217ad1b02135e11ffd1');

var signer;
if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []).then(() => {
        signer = provider.getSigner();
        console.log("Connected to MetaMask wallet:", signer);
    });
  } else {
    console.error("No web3 provider detected. Please install MetaMask or another wallet.");
  }

const contractAddress = "0x8d0dd693256e959052e50AE0Ea95BC112C5BE342";


const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"agreementId","type":"string"},{"indexed":false,"internalType":"address","name":"acceptor","type":"address"}],"name":"AgreementAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"agreementId","type":"string"},{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"address[]","name":"acceptors","type":"address[]"}],"name":"AgreementCreated","type":"event"},{"inputs":[{"internalType":"string","name":"agreementId","type":"string"}],"name":"acceptAgreement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"agreements","outputs":[{"internalType":"address","name":"creator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"agreementId","type":"string"},{"internalType":"address[]","name":"_acceptors","type":"address[]"}],"name":"createAgreement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"agreementId","type":"string"}],"name":"getAgreementDetails","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"agreementId","type":"string"},{"internalType":"address","name":"acceptor","type":"address"}],"name":"hasAccepted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];



const network = provider.getNetwork().then((network) => {
    console.log("Connected to network:", network.name);
    console.log("Chain ID:", network.chainId);
    console.log("Block number:", network.blockNumber);
    console.log("Gas price:", network.gasPrice);
    console.log("Gas limit:", network.gasLimit);
    console.log("Provider URL:", network.provider);
});


// Example of calling a function
async function createAgreement_(agreementId, acceptors, creatorWalletAddres) {
    console.log("Creating agreement with Wallet:", creatorWalletAddres);
    var contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    try {
        const createTx = await contractInstance.createAgreement(agreementId, acceptors, {from: creatorWalletAddres});
        console.log('Transaction hash:', createTx.transactionHash);
    } catch (error) {
        console.error('Error creating agreement:', error);
    }
}

// Function to accept an agreement
async function acceptAgreement(agreementId) {
    var contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    try {
        const acceptTx = await contractInstance.acceptAgreement(agreementId, {from: await signer.getAddress()});
        console.log('Transaction hash:', acceptTx.transactionHash);
    } catch (error) {
        console.error('Error accepting agreement:', error);
    }
}

// Function to check acceptance status of an agreement
async function hasAccepted(agreementId, acceptor) {
    var contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    try {
        const result = await contractInstance.hasAccepted(agreementId, acceptor).call();
        console.log('Has accepted:', result);
    } catch (error) {
        console.error('Error checking acceptance status:', error);
    }
}

// Function to get agreement details
async function getAgreementDetails(agreementId) {
    var contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
    try {
        const result = await contractInstance.getAgreementDetails(agreementId);
        console.log('Agreement details:', result);
        // result[0] will contain the address of the creator
        // result[1] will contain an array of acceptor addresses
        // result[2] will contain an array of boolean values indicating acceptance status
        return result ? result : ""; // Return result if it exists, otherwise return empty string
    } catch (error) {
        console.error('Error getting agreement details:', error);
        return ""; // Return empty string in case of error
    }
}
