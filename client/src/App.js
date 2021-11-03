//Resque
import React, { Component, useState } from 'react';

import Home from './components/home/Home';
import Nav from './components/header/Nav';
import About from "./components/about/About";
import Error from "./components/error/Error";
import Register from "./components/registration/register";
import Login from "./components/registration/login";
import Dashboard from "./components/dashboard/Dashboard";
import Createsupply from "./components/createSupplyChain/createsupply";
import Selectsupplychain from "./components/selectSupplyChain/SelectSupplyChain";
import Enroll from "./components/enroll/Enroll";
import Createsupplyhome from "./components/createsupplyhome/createsupplyhome";
import Createsupplyflow from "./components/createsupplyflow/createsupplyflow";
import TransferProduct from "./components/transferProduct/TransferProduct";
import CreateProduct from "./components/createProduct/CreateProduct";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SupplyChainManagement from "./contracts/SupplyChainManagement.json";
import getWeb3 from "./getWeb3";
import './App.scss';

class App extends Component {

  //const [products, setProducts] = useState();
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      //products: [],
      loading: true
    }

    this.addProduct = this.addProduct.bind(this)
    this.transferProduct = this.transferProduct.bind(this)
    this.currentBatchesInOwnership = this.currentBatchesInOwnership.bind(this)
    this.currentUnitsInOwnership = this.currentUnitsInOwnership.bind(this)
    this.productsInSupplyChain = this.productsInSupplyChain.bind(this)
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      this.setState({ account: accounts[0] });

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainManagement.networks[networkId];
      const contract = new web3.eth.Contract(
        SupplyChainManagement.abi,
        "0x95FC0764712364Fe5F99512C78F70EdFfBf3Ed28",
      );



      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  addProduct = (productNo, productName, noOfBatches, unitsPerBatch, supplyChainId) => {
    this.setState({ loading: true })
    this.state.contract.methods.addProduct(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  transferProduct = (productNo, productName, batchesToTransfer, supplyChainId, transferTo) => {
    this.setState({ loading: true })
    this.state.contract.methods.transferProduct(productNo, productName, batchesToTransfer, supplyChainId, transferTo).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  currentBatchesInOwnership = async (productNo, supplyChainId) => {
    const batches = await this.state.contract.methods.currentBatchesInOwnership(productNo, supplyChainId).call({ from: this.state.account });
    return batches;
  }

  currentUnitsInOwnership = async (productNo, supplyChainId) => {
    const units = await this.state.contract.methods.currentUnitsInOwnership(productNo, supplyChainId).call({ from: this.state.account });
    return units;
  }

  productsInSupplyChain = async (supplyChainId) => {
    //this.setState({ products : []})
    const productsCount = await this.state.contract.methods.productCountInSupplyChain(supplyChainId).call({ from: this.state.account })
    this.setState({ productsCount })
    const products = []
    for (var i = 1; i <= productsCount; i++) {
      const product = await this.state.contract.methods.productBySupplyChain(i).call()
      /*this.setState({
        products: [...this.state.products, product]
      })
      */
      products = [...products, product]
    }
    return products;
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/createsupply">
              <Createsupply />
            </Route>
            <Route exact path="/createsupplyflow">
              <Createsupplyflow />
            </Route>
            <Route exact path="/selectsupplychain">
              <Selectsupplychain />
            </Route>
            <Route exact path="/selectsupplychain/enroll">
              <Enroll />
            </Route>
            <Route exact path="/createsupplyhome">
              <Createsupplyhome />
            </Route>
            <Route exact path="/transferproduct">
              <TransferProduct
                productsInSupplyChain={this.productsInSupplyChain}
                currentBatchesInOwnership={this.currentBatchesInOwnership}
                currentUnitsInOwnership={this.currentUnitsInOwnership}
                transferProduct={this.transferProduct}
              />
            </Route>
            <Route exact path="/createproduct">
              <CreateProduct 
                addProduct={this.addProduct}
              />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;