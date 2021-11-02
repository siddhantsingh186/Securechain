// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract SupplyChainManagement {
    
    //using strings for *;

    // model Product == Batch
    struct Product{
        //string id; //productName_supplyChainID_bno#number
        string productNo; //productName_supplyChainID_bno
        string name;
        uint256 noOfBatches;
        uint256 unitsPerBatch;
        uint256 supplyChainId;
        address manufacturer;
        address currentOwner;
        bool exists;
    }
    
    // map to store products
    // product name => supplychainid => Product
    mapping(string => mapping(uint256 => Product)) public products;
    
    // map to store products with respect to id
    //mapping(string => Product) public productWithId;
    
    // map to store ownership
    // product name => supplychainid => instance => isOwner(bool)
    mapping(string => mapping(uint256 => mapping(address => bool))) public isOwner;
    
    // map to store unitsInOwnership
    // product name => supplychainid => instance => units
    //mapping(string => mapping(uint256 => mapping(address => uint256))) public unitsInOwnership;
    
    // mapping productNo => instance => units
    //mapping(string => mapping(address => uint256)) public uintsInOwnershipOfBatch;
    
    // map productNo => instance => batches
    mapping(string => mapping(address => uint256)) public batchesInOwnership;
    
    // map to store number of products in a supply Chain
    // supplychainid => number of products
    //mapping(uint256 => uint256) public productsCount;
    
    // map productNo => no of batches
    //mapping(string => uint256) public batchesCount;
    
    // mapping productNo => batchNo => Product 
    //mapping(string => mapping(uint256 => Product) public productOfBatch;
    
    // map productNo => productNo
    mapping(string => Product) public batches;
    
    // map productNo => no of units
    //mapping(string => uint256) unitsInBatch;
    
    //uint256 public noOfProducts;

    constructor() public {
        addProduct("XXYY", "Vial", 10, 100, 1/*, "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"*/);
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
    
    /*function uintToString(uint v) public returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }*/

    // function to add a new product to a given supply chain
    function addProduct(string memory _productNo, string memory _productName, uint256 _noOfBatches, uint256 _unitsPerBatch, uint256 _supplyChainId/*, string memory _manufacturer, string memory _currentOwner*/) public {
        
        //require(parseAddr(_manufacturer) == msg.sender, "You are not the authorised to create product");
        //require(parseAddr(_currentOwner) == msg.sender, "You are not the authorised to create product");
        
        /*
        for(uint i=productsCount[_productNo]+1; i<= (productsCount[_batchNo] + _noOfBatches); i++){
            noOfProducts++;
            //string memory bno = uintToString(i);
            string memory batch = "bno".toSlice().concat(bno.toSlice());
            
            string memory batchNo = _productName.toSlice().concat(_supplyChainId.toSlice());
            batchNo = batchNo.toSlice().concat(batch.toSlice());
            //string memory batchNo = string(abi.encodePacked(_productName, _supplyChainId, "#", i));
            //bytes32 memory _id = bytes32(_batchNo) + bytes32("#") + bytes32(i);
            products[_productName][_supplyChainId] = Product(_batchNo, _productName, _units, _supplyChainId, msg.sender, msg.sender, true);
            productOfBatch[_productNo][i] = Product(_batchNo, _productName, _units, _supplyChainId, msg.sender, msg.sender, true);
            
        }
        */
        products[_productName][_supplyChainId] = Product(_productNo, _productName, _unitsPerBatch, _noOfBatches, _supplyChainId, msg.sender, msg.sender, true);
        //productOfBatch[_productNo][i] = Product(_batchNo, _productName, _units, _supplyChainId, msg.sender, msg.sender, true);
        batches[_productNo] = Product(_productNo, _productName,  _noOfBatches, _unitsPerBatch, _supplyChainId, msg.sender, msg.sender, true);
        
        //batchesCount[_productNo] = _noOfBatches;
        
        isOwner[_productName][_supplyChainId][msg.sender] = true;
        
        batchesInOwnership[_productNo][msg.sender] = _noOfBatches;
        //unitsInOwnership[_productName][_supplyChainId][msg.sender] = (_noOfBatches)*(_units);
        //uintsInOwnershipOfBatch[_ProductNo][msg.sender] = (_noOfBatches)*(_units);
        
    }
    
    // function to transfer a product from one instance to another in a given supply chain
    function transferProduct(string memory _productNo, string memory _productName, uint256 _batchesToTransfer, uint256 _supplyChainId,/* string memory _transferFrom,*/ string memory _transferTo) public {
        
        //require(parseAddr(_transferFrom) == msg.sender, "You are not the authorised to transfer product");
        //require(unitsInOwnership[_productName][_supplyChainId][msg.sender] > 0, "You are not an owner of the product at present");
        require(batchesInOwnership[_productNo][msg.sender] > 0, "You are not an owner of the product at present");
        require(_batchesToTransfer > 0, "You cannot transfer 0 units");
        
        address _to = parseAddr(_transferTo);
        
        batchesInOwnership[_productNo][msg.sender] -= _batchesToTransfer;
        //unitsInOwnership[_productName][_supplyChainId][msg.sender] -= _unitsToTransfer;
        //uintsInOwnershipOfBatch[_productNo][msg.sender] -= _unitsToTransfer;
        
        isOwner[_productName][_supplyChainId][_to] = true;
        batchesInOwnership[_productNo][_to] += _batchesToTransfer;
        //unitsInOwnership[_productName][_supplyChainId][_to] += _unitsToTransfer;
        //unitsInOwnershipOfBatch[_productNo][_to] += _unitsToTransfer;
    }
    
    // function to return the number of batches of a given productNo that are at present under the ownership of a given instance in a given supply chain
    function currentBatchesInOwnership(string memory _productNo, uint256 _supplyChainId/*, string memory _instance*/) view public returns(uint256){
        //require(products[_productName][_supplyChainId].exists, "Product does not exist");
        require(batches[_productNo].exists, "Product does not exist");
        //return unitsInOwnership[_productName][_supplyChainId][parseAddr(_instance)];
        return batchesInOwnership[_productNo][/*parseAddr(_instance)*/msg.sender];
    }
    
    // function to return the number of units of a given productNo that are at present under the ownership of a given instance in a given supply chain
    function currentUnitsInOwnership(string memory _productNo, uint256 _supplyChainId/*, string memory _instance*/) view public returns(uint256){
        //require(products[_productName][_supplyChainId].exists, "Product does not exist");
        require(batches[_productNo].exists, "Product does not exist");
        //return unitsInOwnership[_productName][_supplyChainId][parseAddr(_instance)];
        return ((batchesInOwnership[_productNo][/*parseAddr(_instance)*/msg.sender]) * (batches[_productNo].unitsPerBatch));
    }
    
    // function to check whether a given instance has ever been an owner of a given product in a given supply chain 
    /*function hasEverBeenOwner(string memory _productName, uint256 _supplyChainId, string memory _instance) view public returns(bool){
        require(products[_productName][_supplyChainId].exists, "Product does not exist");
        return isOwner[_productName][_supplyChainId][parseAddr(_instance)];
    }
    
    // function to return number of products in a given supply chain
    function supplyChainProductsCount(uint256 _supplyChainId) view public returns(uint256){
        return productsCount[_supplyChainId];
    }
    
    function allBatchNos(string memory _productName, uint256 _supplyChainId) view public returns(string [] memory){
        return products[_productName][_supplyChainId].batchNo;
    }*/
    
}
