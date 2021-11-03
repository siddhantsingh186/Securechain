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
      unitsInOwnership: 0
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
        "0x6dFf2A40829cf61cC6abcCabEBA040740267fabF",
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
    const batches = await this.state.contract.methods.batchesInOwnership(productNo, this.state.account).call();
    console.log(batches)
    this.setState({BatchesInOwnership : batches})
    return this.state.batchesInOwnership;
  }

  currentUnitsInOwnership = async (productNo, supplyChainId) => {
    const units = await this.state.contract.methods.batchesInOwnership(productNo, this.state.account).call();
    console.log(units)
    this.setState({UnitsInOwnership : units})
    return this.state.unitsInOwnership;
  }

  productsInSupplyChain = async (supplyChainId) => {
    //this.setState({ products: [] })
    const productsCount = await this.state.contract.methods.productCountInSupplyChain(supplyChainId).call()
    this.setState({ productsCount: productsCount })
    //const products = []
    this.setState({ products: [] })
    for (var i = 1; i <= productsCount; i++) {
      const product = await this.state.contract.methods.productBySupplyChain(supplyChainId, i).call()
      console.log(product)
      this.setState({
        products: [...this.state.products, product]
      })

      //products = [...products, product]
    }
    return this.state.products;
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
            <Route exact path="/progress"  component = {Progress}/>
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