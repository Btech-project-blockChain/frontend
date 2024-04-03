
function checkMetaMask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      checkConnection();
    } else {
      console.error('MetaMask is not installed!');
    }
  }


async function checkConnection() {
    try {
      // Request access to the user's accounts
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log('Connected with MetaMask:', accounts[0]);
        var select = document.getElementById("wallet-select");
        for (var i = 0; i < accounts.length; i++) {
            var option = document.createElement("option");
            option.text = "Account " + (i+1) + ": " + accounts[i];
            option.value = accounts[i];
            select.add(option);
        }
        return accounts[0];
      } else {
        console.log('User is not connected.');
        return null;
      }
    } catch (error) {
      console.error('Error checking connection with MetaMask:', error);
      return null;
    }
}

function connectMetaMask() {
    // Prompt the user to connect their wallet
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        console.log('accounts are', accounts);
        console.log('Connected with MetaMask:', accounts[0]);
        console.log('Connected with MetaMask:', accounts[1]);
        
    })
    .catch(error => {
        console.error('Error connecting with MetaMask:', error);
    });
}

const connectButton = document.getElementById('connectButton');
connectButton.addEventListener('click', async () => {
    connectMetaMask()
});

checkMetaMask();