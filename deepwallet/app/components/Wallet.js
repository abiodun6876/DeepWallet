
'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';


const Wallet = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('Mainnet');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [importedAccounts, setImportedAccounts] = useState([]);
  const [currency, setCurrency] = useState('ETH');


  // Create a function to save accounts to localStorage
function saveAccountsToLocalStorage(accounts) {
    localStorage.setItem('connectedAccounts', JSON.stringify(accounts));
  }
  
  // Create a function to load accounts from localStorage
  function loadAccountsFromLocalStorage() {
    const savedAccounts = localStorage.getItem('connectedAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  }

 
// Load saved accounts from localStorage on component mount
useEffect(() => {
    const savedAccounts = loadAccountsFromLocalStorage();
    if (savedAccounts) {
      setImportedAccounts(savedAccounts);
    }
  }, []);




// To save accounts:
function saveAccounts(accounts) {
    setImportedAccounts(accounts);
    saveAccountsToLocalStorage(accounts);
  }


  useEffect(() => {
    async function connectToMetaMask() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const accounts = await web3.eth.getAccounts();
          const walletAddress = accounts[0];
          setAddress(walletAddress);

          const weiBalance = await web3.eth.getBalance(walletAddress);
          const walletBalance = web3.utils.fromWei(weiBalance, currency.toLowerCase());
          setBalance(walletBalance);

          // Save the connected account to the list
          const updatedAccounts = [...importedAccounts, walletAddress];
          setImportedAccounts(updatedAccounts);
          saveConnectedAccountsToCookies(updatedAccounts);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask is not installed or not accessible');
      }
    }

    connectToMetaMask();
  }, [currency]);

  const handleCustomAddressChange = (e) => {
    setCustomAddress(e.target.value);
  };

  const connectWithCustomAddress = async () => {
    const web3 = new Web3(window.ethereum);
    // Check if the custom address is a valid Ethereum address
    const isValidAddress = web3.utils.isAddress(customAddress);

    if (isValidAddress) {
      setAddress(customAddress);

      // If a valid address is entered, you may want to clear the balance
      setBalance('0');
    } else {
      // If the address is not valid, you can provide a user-friendly error message
      alert('Invalid Ethereum address. Please enter a valid address.');
    }
  };

  
  const addAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await Web3.eth.getAccounts();
  
        // Save the connected account to the list
        const updatedAccounts = [...importedAccounts, accounts[0]];
        setImportedAccounts(updatedAccounts);
  
        
        
      } catch (error) {
        console.error('Error adding an account:', error);
        // Inside loadAccountsFromLocalStorage


// Inside saveAccountsToLocalStorage
console.log('Saved accounts to localStorage:', accounts);

      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-500 text-white py-4 px-8 text-2xl font-semibold">
        DeepWallet
      </header>
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-2 md:mb-4">
          Connect Wallet
        </button>
        <select
          className="w-full py-2 px-4 border border-gray-300 rounded-md mb-2 md:mb-4 focus:outline-none focus:border-blue-500"
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
        >
          <option value="Mainnet">Mainnet</option>
          <option value="Ropsten">Ropsten</option>
          <option value="CustomNetwork1">Ethereum Mainnet</option>
          <option value="CustomNetwork2">Linea Mainnet</option>

          

          {/* Add more network options */}
        </select>
        <select
          className="w-full py-2 px-4 border border-gray-300 rounded-md mb-2 md:mb-4 focus:outline-none focus:border-blue-500"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          {importedAccounts.map((account, index) => (
            <option key={index} value={account}>
              {account}
            </option>
          ))}
        </select>
        <button
          onClick={addAccount}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-2 md:mb-4"
        >
          Add Account
        </button>
        <input
          type="text"
          placeholder="Enter Ethereum address"
          value={customAddress}
          onChange={handleCustomAddressChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md mb-2 md:mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={connectWithCustomAddress}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-2 md:mb-4"
        >
          Connect Custom Address
        </button>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="text-center">
            <div className="text-lg font-semibold mb-1">Balance</div>
            <div className="text-xl">{balance}</div>
            <div className="text-lg">{currency}</div>
            <div className="text-lg">{`$0.00 USD`}</div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer">
              Buy
            </div>
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer">
              Send
            </div>
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer">
              Swap
            </div>
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer">
              Bridge
            </div>
            <div className="bg-blue-500 rounded-full p-2 cursor-pointer">
              Portfolio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
