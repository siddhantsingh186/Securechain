import SupplyChainManagement from "./contracts/SupplyChainManagement.json";
import getWeb3 from "./getWeb3";

try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    //const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    //this.setState({ account: accounts[0] });

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SupplyChainManagement.networks[networkId];
    const contract = new web3.eth.Contract(
        SupplyChainManagement.abi,
        deployedNetwork && deployedNetwork.address,
    );

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    //this.setState({ web3, accounts, contract });

} catch (error) {
    // Catch any errors for any of the above operations.
    alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
}
export default contract;