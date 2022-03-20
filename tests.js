const Web3 = require('web3');
const Educa = require('./Educa.json');
const WalletConnectProvider = require('@walletconnect/web3-provider');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const celoContracKit = require("@celo/contractkit");

const ACCOUNT_ADDRESS = "0xdf0eE014447C73aBFB02B4D8C96052307cB47106"//process.env.PUBLIC_KEY;
const PRIVATE_KEY = "3784ae073658c321c8932b8b579ee7903310a169956ed1ce839be90db0d7e711"
//process.env.PRIVATE_KEY;
const ETH_NETWORK = "https://alfajores-forno.celo-testnet.org";
const CONTRACT_ADDRESS = "0xa824DB66eb16B2a5dC94fDa40AEDD6f70D263544"//process.env.CONTRACT_ADDRESS;

const testFunction = async () => {
    const student = "Nicholas Marques";
    const studentAddress = "0x021161770705ecc2e6785395376ea640c92727f6";
    const klass = "Capoeira";
  
    // const provider = new WalletConnectProvider.default({
    //   rpc: {
    //     44787: ETH_NETWORK,
    //   },
    // });


    provider = new HDWalletProvider({
      privateKeys: [PRIVATE_KEY],
      providerOrUrl: ETH_NETWORK,
      addressIndex: 0,
      numberOfAddresses: 10
    });

    // await provider.enable();
    const web3 = new Web3(provider);
    // const EducaContract = new web3.eth.Contract(Educa.abi, CONTRACT_ADDRESS);
    const kit = celoContracKit.newKitFromWeb3(web3);
  
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

    console.log(response);

    return response;
};

testFunction();