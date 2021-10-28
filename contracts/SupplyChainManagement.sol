// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

contract SupplyChainManagement {

    // model Product
    struct Product {
        string name;
        uint256 units;
        string supplyChain;
        address manufacturer;
        address currentOwner;
        bool exists;
    }
    
    // map to store products
    // product name => supply chain name => Product
    mapping(string => mapping(string => Product)) public products;
    
    // map to store ownership
    // product name => supply chain name => instance => isOwner(bool)
    mapping(string => mapping(string => mapping(address => bool))) public isOwner;
    
    // map to store unitsInOwnership
    // product name => supply chain name => instance => units
    mapping(string => mapping(string => mapping(address => uint256))) public unitsInOwnership;
    
    // map to store number of products in a supply Chain
    // supply chain name => number of products
    mapping(string => uint256) public productsCount;
    
    uint256 public noOfProducts;

    constructor() public {
        addProduct("Vial", 100, "Vial Supply Chain", "0xeC8aCB71e017ffC9FDbDb25D45942C40c032A682", "0xeC8aCB71e017ffC9FDbDb25D45942C40c032A682");
    }
    
    // 
    function parseAddr(string memory _a) internal pure returns (address _parsedAddress) {
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i = 2; i < 2 + 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
    }

    // function to add a new product to a given supply chain
    function addProduct(string memory _productName, uint256 _units, string memory _supplyChainName, string memory _manufacturer, string memory _currentOwner) public {
        
        //require(parseAddr(_manufacturer) == msg.sender, "You are not the authorised to create product");
        //require(parseAddr(_currentOwner) == msg.sender, "You are not the authorised to create product");
        
        noOfProducts++;
        productsCount[_supplyChainName]++;
        products[_productName][_supplyChainName] = Product(_productName, _units, _supplyChainName, msg.sender, msg.sender, true);
        isOwner[_productName][_supplyChainName][msg.sender] = true;
        unitsInOwnership[_productName][_supplyChainName][msg.sender] = _units;
    }
    
    // function to transfer a product from one instance to another in a given supply chain
    function transferProduct(string memory _productName, uint256 _unitsToTransfer, string memory _supplyChainName, string memory _transferFrom, string memory _transferTo) public {
        
        address _to = parseAddr(_transferTo);
        require(parseAddr(_transferFrom) == msg.sender, "You are not the authorised to transfer product");
        require(unitsInOwnership[_productName][_supplyChainName][msg.sender] > 0, "You are not an owner of the product at present");
        require(_unitsToTransfer > 0, "You cannot transfer 0 units");
        
        unitsInOwnership[_productName][_supplyChainName][msg.sender] -= _unitsToTransfer;
        
        isOwner[_productName][_supplyChainName][_to] = true;
        unitsInOwnership[_productName][_supplyChainName][_to] += _unitsToTransfer;
    }
    
    // function to return the number of units of a given product that are at present under the ownership of a given instance in a given supply chain
    function currentUnitsInOwnership(string memory _productName, string memory _supplyChainName, string memory _instance) view public returns(uint256){
        require(products[_productName][_supplyChainName].exists, "Product does not exist");
        return unitsInOwnership[_productName][_supplyChainName][parseAddr(_instance)];
    }
    
    // function to check whether a given instance has ever been an owner of a given product in a given supply chain 
    function hasEverBeenOwner(string memory _productName, string memory _supplyChainName, string memory _instance) view public returns(bool){
        require(products[_productName][_supplyChainName].exists, "Product does not exist");
        return isOwner[_productName][_supplyChainName][parseAddr(_instance)];
    }
    
    // function to return number of products in a given supply chain
    function supplyChainProductsCount(string memory _supplyChainName) view public returns(uint256){
        return productsCount[_supplyChainName];
    }
    
}
