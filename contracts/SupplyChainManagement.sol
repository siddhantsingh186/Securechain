// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;
pragma experimental ABIEncoderV2;

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
        string ownerName;
        bool exists;
    }
    
    struct ProductHistory{
        string timestamp;
        address currentOwner;
        string ownerName;
        string description;
        address _sender;
        string _senderName;
        address _receiver;
        string _receiverName;
    }
    
    struct Notification{
        string notiType;
        uint256 requestId;
        string timestamp;
        address _sender;
        string _senderName;
        address _receiver;
        string _receiverName;
        string productNo;
        string productName;
        uint256 supplyChainId;
        uint256 batchesToTransfer;
        uint256 firstBatch;
        uint256 lastBatch;
        bool exists;
    }
    
    // map 
    
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
    
    // map supply chain id => product count in supply chain => Product
    mapping(uint256 => mapping(uint256 => Product)) public productBySupplyChain;
    
    // map supply chain id => product count in supply chain
    mapping(uint256 => uint256) public productCountInSupplyChain;
    
    // map supply chain id => productNo => batch id => historyNo => ProductHistory
    mapping(uint256 => mapping(string => mapping(uint256 => mapping(uint256 => ProductHistory)))) public batchHistory;
    
    // map supply chain id => productNo => batch id => history count
    mapping(uint256 => mapping(string => mapping(uint256 => uint256))) public batchHistoryCount;
    
    // map address => supply chain id => productNo => last batch id in ownership
    mapping(address => mapping(uint256 => mapping(string => uint256))) public firstBatchIdInOwnership;
    
    // map address => supply chain id => productNo => last batch id in ownership
    mapping(address => mapping(uint256 => mapping(string => uint256))) public lastBatchIdInOwnership;
    
    // map address => supply chain id => productNo => last batch id in ownership
    mapping(address => mapping(uint256 => mapping(string => uint256))) public firstBatchIdToRequest;
    
    // map address => supply chain id => productNo => last batch id in ownership
    mapping(address => mapping(uint256 => mapping(string => uint256))) public lastBatchIdToRequest;
    
    // map address => notifications count => Notification
    mapping(address => mapping(uint256 => Notification)) notifications;
    
    // map address => notifications count
    mapping(address => uint256) notificationsCount;
    
    // map supply chain id => productNo => batch id => count of owners => address
    //mapping(uint256 => mapping(string => mapping(uint256 => mapping(uint256 => address)))) public batchOwners;
    
    // map supply chain id => productNo => batch id => count of owners
    //mapping(uint256 => mapping(string => mapping(uint256 => uint256))) public batchOwnersCount;
    
    // map supply chain id => productNo => batch id => count of batches transferred
    //mapping(uint256 => mapping(string => mapping(uint256 => uint256))) public batchesWithAddress;
    
    // map productNo => no of units
    //mapping(string => uint256) unitsInBatch;
    
    //uint256 public noOfProducts;

    constructor() public {
        addProduct("XXYY", "Vial", 10, 100, 1, "Akshat Dobriyal", /*"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"*/"22:35:10_06-11-2021");
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
    function addProduct(string memory _productNo, string memory _productName, uint256 _noOfBatches, uint256 _unitsPerBatch, uint256 _supplyChainId, /*string memory _manufacturer, string memory _currentOwner*/string memory _ownerName, string memory _timestamp/*, string memory _description*/) public {
        
        //require(parseAddr(_manufacturer) == msg.sender, "You are not the authorised to create product");
        //require(parseAddr(_currentOwner) == msg.sender, "You are not the authorised to create product");
        
        products[_productName][_supplyChainId] = Product(_productNo, _productName, _unitsPerBatch, _noOfBatches, _supplyChainId, msg.sender, msg.sender, _ownerName, true);
        //productOfBatch[_productNo][i] = Product(_batchNo, _productName, _units, _supplyChainId, msg.sender, msg.sender, true);
        batches[_productNo] = Product(_productNo, _productName,  _noOfBatches, _unitsPerBatch, _supplyChainId, msg.sender, msg.sender, _ownerName, true);
        
        productCountInSupplyChain[_supplyChainId]++;
        productBySupplyChain[_supplyChainId][productCountInSupplyChain[_supplyChainId]] = Product(_productNo, _productName,  _noOfBatches, _unitsPerBatch, _supplyChainId, msg.sender, msg.sender, _ownerName, true);
        
        isOwner[_productName][_supplyChainId][msg.sender] = true;
        
        batchesInOwnership[_productNo][msg.sender] = _noOfBatches;
        
        firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo] = 1;
        
        lastBatchIdInOwnership[msg.sender][_supplyChainId][_productNo] = _noOfBatches;
        
        firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo] = 1;
        
        lastBatchIdToRequest[msg.sender][_supplyChainId][_productNo] = _noOfBatches;
        
        /*for(uint256 i=firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo]; i<=lastBatchIdInOwnership[msg.sender][_supplyChainId][_productNo]; i++){
            batchHistory[_supplyChainId][_productNo][i][1] = ProductHistory(_timestamp, msg.sender, _ownerName, "Product Created");
            batchHistoryCount[_supplyChainId][_productNo][i]++;
        }*/
        addHistory(msg.sender, _productNo, _productName, _noOfBatches, _unitsPerBatch, _supplyChainId, _ownerName, _timestamp);
        
    }
    
    function addHistory(address _owner, string memory _productNo, string memory _productName, uint256 _noOfBatches, uint256 _unitsPerBatch, uint256 _supplyChainId, /*string memory _manufacturer, string memory _currentOwner*/string memory _ownerName, string memory _timestamp/*, string memory _description*/) public {
        for(uint256 i=firstBatchIdInOwnership[_owner][_supplyChainId][_productNo]; i<=lastBatchIdInOwnership[_owner][_supplyChainId][_productNo]; i++){
            batchHistory[_supplyChainId][_productNo][i][1] = ProductHistory(_timestamp, _owner, _ownerName, "Product Created", _owner, _ownerName, _owner, _ownerName);
            batchHistoryCount[_supplyChainId][_productNo][i]++;
        }
    }
    
    // function to transfer a product from one instance to another in a given supply chain
    function transferProduct(string memory _productNo, string memory _productName, uint256 _batchesToTransfer, uint256 _supplyChainId, address _transferFrom, string memory _transferFromName, address _transferTo, string memory _transferToName, string memory _timestamp, /*string memory _description,*/uint256 _notificationId) public {
        
        //require(parseAddr(_transferFrom) == msg.sender, "You are not the authorised to transfer product");
        //require(unitsInOwnership[_productName][_supplyChainId][msg.sender] > 0, "You are not an owner of the product at present");
        require(batchesInOwnership[_productNo][_transferFrom] > 0, "You are not an owner of the product at present");
        require(_batchesToTransfer > 0, "You cannot transfer 0 units");
        
        //address _to = parseAddr(_transferTo);
        
        batchesInOwnership[_productNo][_transferFrom] -= _batchesToTransfer;
        
        if(batchesInOwnership[_productNo][_transferTo] == 0){
            //firstBatchIdInOwnership[_to][_supplyChainId][_productNo] = firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo];
            firstBatchIdInOwnership[_transferTo][_supplyChainId][_productNo] = notifications[_transferTo][_notificationId].firstBatch;
            
            firstBatchIdToRequest[_transferTo][_supplyChainId][_productNo] = notifications[_transferTo][_notificationId].firstBatch;
        }
        
        /*for(uint256 i = firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo]; i < (firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo] + _batchesToTransfer); i++){
            batchHistoryCount[_supplyChainId][_productNo][i]++;
            batchHistory[_supplyChainId][_productNo][i][batchHistoryCount[_supplyChainId][_productNo][i]] = ProductHistory(_timestamp, _to, _transferToName, _description);
        }*/
        
        for(uint256 i = notifications[_transferTo][_notificationId].firstBatch; i <= notifications[_transferTo][_notificationId].lastBatch; i++){
            batchHistoryCount[_supplyChainId][_productNo][i]++;
            batchHistory[_supplyChainId][_productNo][i][batchHistoryCount[_supplyChainId][_productNo][i]] = ProductHistory(_timestamp, _transferTo, _transferToName, "Product Transferred", _transferFrom, _transferFromName, _transferTo, _transferToName);
        }
        
        if(firstBatchIdInOwnership[_transferFrom][_supplyChainId][_productNo] == notifications[_transferTo][_notificationId].firstBatch){
            firstBatchIdInOwnership[_transferFrom][_supplyChainId][_productNo] += _batchesToTransfer;
            
            firstBatchIdToRequest[_transferFrom][_supplyChainId][_productNo] += _batchesToTransfer;
        }
        
        //lastBatchIdInOwnership[_to][_supplyChainId][_productNo] = firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo] - 1;
        lastBatchIdInOwnership[_transferTo][_supplyChainId][_productNo] = notifications[_transferTo][_notificationId].lastBatch;
        
        lastBatchIdToRequest[_transferTo][_supplyChainId][_productNo] = notifications[_transferTo][_notificationId].lastBatch;
        
        isOwner[_productName][_supplyChainId][_transferTo] = true;
        batchesInOwnership[_productNo][_transferTo] += _batchesToTransfer;
    }
    
    // function to request transfer
    function requestTransfer(string memory _productNo, string memory _productName, uint256 _batchesToTransfer, uint256 _supplyChainId,/* string memory _transferFrom,*/ string memory _transferTo, string memory _transferToName, string memory _timestamp) public {
        //require(parseAddr(_transferFrom) == msg.sender, "You are not the authorised to transfer product");
        //require(unitsInOwnership[_productName][_supplyChainId][msg.sender] > 0, "You are not an owner of the product at present");
        require(lastBatchIdToRequest[msg.sender][_supplyChainId][_productNo] - firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo] + 1 >= _batchesToTransfer, "You don't have enough batches to transfer");
        require(batchesInOwnership[_productNo][msg.sender] > 0, "You are not an owner of the product at present");
        require(_batchesToTransfer > 0, "You cannot transfer 0 units");
        
        address _to = parseAddr(_transferTo);
        
        string memory _currentOwner = batchHistory[_supplyChainId][_productNo][firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo]][batchHistoryCount[_supplyChainId][_productNo][firstBatchIdInOwnership[msg.sender][_supplyChainId][_productNo]]].ownerName;
        
        for(uint256 i = firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo]; i < (firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo] + _batchesToTransfer); i++){
            batchHistoryCount[_supplyChainId][_productNo][i]++;
            batchHistory[_supplyChainId][_productNo][i][batchHistoryCount[_supplyChainId][_productNo][i]] = ProductHistory(_timestamp, msg.sender, _currentOwner, "Transfer Requested", msg.sender, _currentOwner, _to, _transferToName);
        }
        
        notificationsCount[_to]++;
        notifications[_to][notificationsCount[_to]] = Notification("Request", notificationsCount[_to], _timestamp, msg.sender, _currentOwner, _to, _transferToName, _productNo, _productName, _supplyChainId, _batchesToTransfer, firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo], firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo] + _batchesToTransfer - 1, true);
        
        firstBatchIdToRequest[msg.sender][_supplyChainId][_productNo] += _batchesToTransfer;
        
    }
    
    // function to accept transfer
    function acceptTransfer(uint256 _notificationId, string memory _timestamp) public {
        for(uint256 i = notifications[msg.sender][_notificationId].firstBatch; i <= notifications[msg.sender][_notificationId].lastBatch; i++){
            batchHistoryCount[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i]++;
            batchHistory[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i][batchHistoryCount[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i]] = ProductHistory(_timestamp, notifications[msg.sender][_notificationId]._sender, notifications[msg.sender][_notificationId]._senderName, "Transfer Request Accepted", notifications[msg.sender][_notificationId]._sender, notifications[msg.sender][_notificationId]._senderName, notifications[msg.sender][_notificationId]._receiver, notifications[msg.sender][_notificationId]._receiverName);
        }
        notifications[msg.sender][notificationsCount[msg.sender]].exists = false;
        transferProduct(notifications[msg.sender][_notificationId].productNo, notifications[msg.sender][_notificationId].productName, notifications[msg.sender][_notificationId].batchesToTransfer, notifications[msg.sender][_notificationId].supplyChainId, notifications[msg.sender][_notificationId]._sender, notifications[msg.sender][_notificationId]._senderName, notifications[msg.sender][_notificationId]._receiver, notifications[msg.sender][_notificationId]._receiverName, _timestamp, _notificationId);
        
    }
    
    // function to reject transfer
    /*function rejectTransfer(uint256 _notificationId, string memory _timestamp) public {
        for(uint256 i = notifications[msg.sender][_notificationId].firstBatch; i <= notifications[msg.sender][_notificationId].lastBatch; i++){
            batchHistoryCount[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i]++;
            batchHistory[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i][batchHistoryCount[notifications[msg.sender][_notificationId].supplyChainId][notifications[msg.sender][_notificationId].productNo][i]] = ProductHistory(_timestamp, notifications[msg.sender][_notificationId]._sender, notifications[msg.sender][_notificationId]._senderName, "Transfer request rejected");
        }
        notifications[msg.sender][notificationsCount[msg.sender]].exists = false;
    }*/
    
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
    
    // function to return the productName of a product
    function getProductName(string memory _productNo) view public returns(string memory){
        //require(products[_productName][_supplyChainId].exists, "Product does not exist");
        require(batches[_productNo].exists, "Product does not exist");
        return (batches[_productNo].name);
    }
    
    // function to get first batch id in ownership
    function getFirstBatchIdInOwnership(/*string memory _address,*/ uint256 _supplyChainId, string memory _productNo) view public returns(uint256){
        //address _sender = parseAddr(_address);
        return (firstBatchIdInOwnership[/*_sender*/msg.sender][_supplyChainId][_productNo]);
    }

    // function to get last batch id in ownership
    function getLastBatchIdInOwnership(/*string memory _address,*/ uint256 _supplyChainId, string memory _productNo) view public returns(uint256){
        //address _sender = parseAddr(_address);
        return (lastBatchIdInOwnership[/*_sender*/msg.sender][_supplyChainId][_productNo]);
    }
    
    // function to get notifications count of a user
    function getNotificationsCount(string memory _user) view public returns(uint256){
        address _userAddress = parseAddr(_user);
        return(notificationsCount[_userAddress]);
    }    
    
    // function to get notifications of a user
    function getNotifications(string memory _user, uint256 _notificationId) view public returns(Notification memory){
        address _userAddress = parseAddr(_user);
        return(notifications[_userAddress][_notificationId]);
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