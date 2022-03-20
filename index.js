const Web3 = require('web3');
const Educa = require('./Educa.json');
const WalletConnectProvider = require('@walletconnect/web3-provider');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const ACCOUNT_ADDRESS = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETH_NETWORK = "https://alfajores-forno.celo-testnet.org";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

exports.handler = async (event) => {
    const body = event
    const student = body.student;
    const studentAddress = body.studentAddress;
    const klass = body.class;
  
    const provider = new WalletConnectProvider({
      rpc: {
        44787: ETH_NETWORK,
      },
    });

  //   provider = new HDWalletProvider({
  //     mnemonic: PRIVATE_KEY,
  //     providerOrUrl: ETH_NETWORK,
  //     addressIndex: 0
  // });

    await provider.enable();
    const web3 = new Web3(provider);
    const kit = newKitFromWeb3(web3);
  
    const EducaContract = new kit.connection.web3.eth.Contract(
      Educa.abi,
      CONTRACT_ADDRESS,
    );

    const data = {
      "recipient": studentAddress,
      "student": student,
      "teacher": studentAddress,
      "class": klass
    }

    const result = await EducaContract.methods.confirmAttendance(studentAddress, data).send({from: ACCOUNT_ADDRESS});
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };

    return response;
};