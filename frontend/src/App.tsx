import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { ethers } from "ethers";
import { Web3Provider , JsonRpcSigner , JsonRpcProvider , AlchemyProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { address } from './contracts/address.json';
import { abi } from './contracts/abi.json';
import { Greeter } from '../../src/types/Greeter';

let provider: Web3Provider | JsonRpcProvider | AlchemyProvider;
let signer: JsonRpcSigner | Wallet;
let greetContract: Greeter;

function App() {
  const [addressWallet, setAddressWallet] = useState('0x');
  const [message , setMessage] = useState('');
  const [status , setStatus] = useState('');
  const [depositeMoney , setDepositeMoney] = useState('');
  const [withdrawMoney , setWithdraweMoney] = useState('');
  const [balance , setBlance] = useState('');

  async function connent(){
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts' , []);
    signer = provider.getSigner();

    setAddressWallet(  await signer.getAddress() );

    greetContract = new ethers.Contract( address , abi , signer ) as Greeter;
  }

  const great = async () => {
    if( greetContract === undefined ){
      setStatus('Please firstly connect wallet');
    }else{
      setStatus(await greetContract.greet());
    }
  }

  async function setGreet() {
    if( greetContract === undefined ){
      setStatus('Please firstly connect wallet');
    }else{
      const tx = await greetContract.connect(signer).setGreeting(message);
      await tx.wait();
      setStatus('Write to block successfulty');
    }
  }

  async function setDeposite() {
    if( greetContract === undefined ){
      setStatus('Please firstly connect wallet');
    }else{
      const tx = await greetContract.connect(signer).deposit( depositeMoney );
      await tx.wait();
      setStatus('Deposite already');
    }
  }

  async function setWithdraw() {
    if( greetContract === undefined ){
      setStatus('Please firstly connect wallet');
    }else{
      const tx = await greetContract.connect(signer).withdraw( withdrawMoney );
      await tx.wait();
      setStatus('Withdraw already');
    }
  }

  async function checkBalance(){
    if( greetContract === undefined ){
      setStatus('Please firstly connect wallet');
    }else{
      const tx = await greetContract.connect(signer).checkBalance();  
      setBlance( Number(tx).toString() ); 
    }
  }

  return (
    <div>
        <div>Address : { addressWallet }</div>
        <div>Status: {status}</div>
        <div><button onClick={ ()=> connent() } >Connect Wallet</button></div>

        <br/>
        <h2>I'm Bank</h2>
        <div>
          <div>Deposite Amount:</div>
          <input type="text" onChange={ (e)=> setDepositeMoney(e.target.value) } placeholder="Amount"/><br/>
          <button onClick={ ()=> setDeposite() } >Deposite</button> 
        </div>
        
        <br/>
        <div>
          <div>Withdraw Amount:</div>
          <input type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="Amount"/><br/>
          <button onClick={ ()=> setWithdraw() } >Deposite</button> 
        </div>

        <br/>
        <div>
          <div>Checkbalance: { balance } </div>
          <button onClick={ ()=> checkBalance() } >Your Balance</button> 
        </div>

    </div>
  )
}

export default App
