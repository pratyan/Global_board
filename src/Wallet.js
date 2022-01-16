import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import global_board_abi from './Contracts/global_board_abi.json'
import TextField from "@material-ui/core/TextField";



const Wallet = () => {
	const contractAddress = '0x59d3631c86BbE35EF041872d502F218A39FBa150';

	const [connButtonText, setConnButtonText] = useState("Connect Wallet");
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [msgs, setmsgs] = useState("");
	const [msg, setmsg] = useState(null);


	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			})

		}else {
			console.log('need to install metamask');
			setErrorMessage('Please install MetaMask')
		}
	}

	const accountChangedHandler = (newAddress) => {
		setDefaultAccount(newAddress);
		updateEthers();

	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

		let tempSigner = tempProvider.getSigner();

		let tempContract = new ethers.Contract(contractAddress, global_board_abi, tempSigner);

		setProvider(tempProvider);
		setSigner(tempSigner);
		setContract(tempContract);
	}

	// useEffect(() => {
	// 	if (contract != null){
	// 		updateBalance();
	// 		updateTokenName();
	// 	}

	// }, [contract])

	const sendMsgHandler = async () => {
		let txh = await contract.record(msg);

		let mm = await contract.recive()
		setmsgs(mm);
	}


	return (
		<div>
			<h2>{" Welcome To Global Board"}</h2>
			<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
			
			<div className={styles.walletCard}>
				<div>
					<h3>Address: {defaultAccount}</h3>
				</div>

			</div>

			<div
		      style={{
		        alignSelf: 'center',
		        color: 'orange',
		        Padding: 100,
		      }}
		    >

		      <TextField
		        value={msg}
		        label="type your message"
		        onChange={(e) => {
		          setmsg(e.target.value);
		        }}
		      />
		      <button className={styles.button6} onClick={sendMsgHandler}>Send</button>
		      <h3>Hall Of Msgs: </h3>
		      <h4 
		      	style={{
		        color: 'black',
		      }}>{msgs}</h4>
		    </div>

			{errorMessage}
		</div>
		);
	
}

export default Wallet;
