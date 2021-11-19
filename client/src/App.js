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
import Progress from './components/progress/progress';

class App extends Component {

  //const [products, setProducts] = useState();
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      products: [],
      loading: true,
      productsCount: 0,
      batchesInOwnership: 0,
      unitsInOwnership: 0,
      productHistory: [],
      batchIdsInOwnership: []
    }

    this.addProduct = this.addProduct.bind(this)
    this.transferProduct = this.transferProduct.bind(this)
    this.currentBatchesInOwnership = this.currentBatchesInOwnership.bind(this)
    this.currentUnitsInOwnership = this.currentUnitsInOwnership.bind(this)
    this.productsInSupplyChain = this.productsInSupplyChain.bind(this)
    this.getProductName = this.getProductName.bind(this)
    this.getProductHistory = this.getProductHistory.bind(this)
    this.getBatchIdsInOwnership = this.getBatchIdsInOwnership.bind(this)
    this.requestTransfer = this.requestTransfer.bind(this)
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
        "0xd1594D70F48fCD63371E65C6656d093AA24f4f3D",
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

  addProduct = (productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp) => {
    this.setState({ loading: true })
    console.log(this.state.contract)
    this.state.contract.methods.addProduct(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  transferProduct = (productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId) => {
    this.setState({ loading: true })
    this.state.contract.methods.transferProduct(productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  requestTransfer = (productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp) => {
    console.log("hello")
    this.setState({ loading: true })
    this.state.contract.methods.requestTransfer(productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  currentBatchesInOwnership = (productNo, supplyChainId) => {
    console.log(this.state.contract)
    const batches = this.state.contract.methods.batchesInOwnership(productNo, this.state.account).call().then((res) => { return res })
    console.log("bathches", batches)
    return batches;
  }

  currentUnitsInOwnership = async (productNo, supplyChainId) => {
    const units = await this.state.contract.methods.currentUnitsInOwnership(productNo, supplyChainId).call();
    console.log(units)
    //this.setState({UnitsInOwnership : units})
    //return this.state.unitsInOwnership;
    return units;
  }
  
  getProductName = async (productNo) => {
    const productName = await this.state.contract.methods.getProductName(productNo).call();
    console.log(productName)
    return productName;
  }

  productsInSupplyChain = async (supplyChainId) => {
    //this.setState({ products: [] })
    const productsCount = await this.state.contract.methods.productCountInSupplyChain(supplyChainId).call()
    console.log(productsCount)
    this.setState({ productsCount: productsCount })
    //const products = []
    this.setState({ products: [] })
    for (var i = 1; i <= productsCount; i++) {
      const product = await this.state.contract.methods.productBySupplyChain(supplyChainId, i).call()
      this.setState({
        products: [...this.state.products, product]
      })
      console.log("Debug Products", this.state.products);
      //products = [...products, product]
    }
    return this.state.products;
  }

  getProductHistory = async (supplyChainId, productNo, batchId) => {
    const batchHistoryCount = await this.state.contract.methods.batchHistoryCount(supplyChainId, productNo, batchId).call().then((res)=>{return res})
    console.log(batchHistoryCount)
    this.setState({ batchHistoryCount: batchHistoryCount })
    this.setState({ productHistory : [] })
    for (var i = 1; i <= batchHistoryCount; i++) {
      const productHistory = await this.state.contract.methods.batchHistory(supplyChainId, productNo, batchId, i).call().then((res)=>{return res})
      this.setState({
        productHistory: [...this.state.productHistory, productHistory]
      })
      console.log("Debug Product History", this.state.productHistory);
    }
    return this.state.productHistory;
  }

  getBatchIdsInOwnership = async(supplyChainId, productNo) => {
    const firstBatchIdInOwnership = await this.state.contract.methods.getFirstBatchIdInOwnership(supplyChainId, productNo).call()
    console.log("firstBatchIdInOwnership", firstBatchIdInOwnership)

    const lastBatchIdInOwnership = await this.state.contract.methods.getLastBatchIdInOwnership(supplyChainId, productNo).call()
    console.log("lastBatchIdInOwnership", lastBatchIdInOwnership)

    this.setState({
      batchIdsInOwnership: []
    })
    for (var i = firstBatchIdInOwnership; i <= lastBatchIdInOwnership; i++){
      this.setState({
        batchIdsInOwnership: [...this.state.batchIdsInOwnership, i]
      })
    }
    return this.state.batchIdsInOwnership;
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
                //batchesOwnership={this.state.batchesInOwnership}
                //unitsOwnership={this.state.unitsInOwnership}
                getProductName={this.getProductName}
                productsInSupplyChain={this.productsInSupplyChain}
                currentBatchesInOwnership={this.currentBatchesInOwnership}
                currentUnitsInOwnership={this.currentUnitsInOwnership}
                transferProduct={this.transferProduct}
                requestTransfer={this.requestTransfer}
              />
            </Route>
            <Route exact path="/createproduct">
              <CreateProduct 
                addProduct={this.addProduct}
                currentBatchesInOwnership = {this.currentBatchesInOwnership}
              />
            </Route>
            <Route exact path="/progress" >
              <Progress 
                getBatchIdsInOwnership={this.getBatchIdsInOwnership}
                getProductHistory = {this.getProductHistory}
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
