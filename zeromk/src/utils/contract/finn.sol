// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Bucket is ReentrancyGuard {
    using Counters for Counters.Counter;

    address public creator;
    bool public isPublic;
    mapping(address => uint256) public tokenProportions;
    mapping(address => uint256) public tokenBalances;
    string public name;
    string public description;
    string[] public chains;

    struct BucketStruct {
        address tokenAddress;
        uint256 share;
        string chain;
    }

    BucketStruct[] public bucketsDetails;

    event BucketCreated(
        address indexed creator,
        bool isPublic,
        address[] tokens,
        uint256[] proportions,
        string[] chains,
        string name,
        string description
    );
    event TokensLocked(address indexed token, uint256 amount);

    modifier onlyCreator() {
        require(msg.sender == creator, "Not the bucket creator");
        _;
    }

    constructor(
        address _creator,
        bool _isPublic,
        address[] memory _tokens,
        uint256[] memory _proportions,
        string[] memory _chains,
        string memory _name,
        string memory _description
    ) {
        require(
            _tokens.length == _proportions.length && _chains.length > 0,
            "Invalid input"
        );

        creator = _creator;
        isPublic = _isPublic;
        name = _name;
        description = _description;
        chains = _chains;

        // Validate and set token proportions
        uint256 totalProportion;
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_proportions[i] > 0, "Proportion must be greater than 0");
            totalProportion += _proportions[i];
            tokenProportions[_tokens[i]] = _proportions[i];
            bucketsDetails.push(
                BucketStruct({
                    tokenAddress: _tokens[i],
                    share: _proportions[i],
                    chain: _chains[i]
                })
            );
        }
        require(totalProportion == 100, "Total proportion must be 100");

        emit BucketCreated(
            _creator,
            _isPublic,
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
    }

    function addToken(
        address token,
        uint256 amount
    ) external payable onlyCreator nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Ensure the sent Ether value is equal to the specified token amount
        require(
            msg.value == 0,
            "Ether value sent with the transaction should be 0"
        );

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        tokenBalances[token] += amount;

        emit TokensLocked(token, amount);
    }

    function withdrawTokens(address token) external onlyCreator nonReentrant {
        require(tokenBalances[token] > 0, "No tokens to withdraw");

        IERC20(token).approve(creator, tokenBalances[token]);

        IERC20(token).transfer(creator, tokenBalances[token]);

        tokenBalances[token] = 0;
    }

    function getBucketDetails(
        address bucketAddress
    )
        external
        view
        returns (
            address _creator,
            bool _isPublic,
            address[] memory _tokens,
            uint256[] memory _proportions,
            string[] memory _chains,
            string memory _name,
            string memory _description
        )
    {
        Bucket bucket = Bucket(bucketAddress);
        _creator = bucket.creator();
        _isPublic = bucket.isPublic();
        _name = bucket.name();
        _description = bucket.description();

        // Initialize arrays with correct length
        _tokens = new address[](bucketsDetails.length);
        _proportions = new uint256[](bucketsDetails.length);
        _chains = new string[](bucketsDetails.length);

        // Populate arrays with correct values
        for (uint256 i = 0; i < bucketsDetails.length; i++) {
            _tokens[i] = bucketsDetails[i].tokenAddress;
            _proportions[i] = bucketsDetails[i].share;
            _chains[i] = bucketsDetails[i].chain;
        }
    }
}

contract BucketFactory {
    using Counters for Counters.Counter;

    address[] public allBuckets;
    Counters.Counter private bucketIds;
    mapping(address => address[]) public userToBuckets;
    mapping(address => address[]) public userInvestedBuckets;

    event BucketCreated(
        address indexed creator,
        address indexed bucket,
        bool isPublic,
        address[] tokens,
        uint256[] proportions,
        string[] chains,
        string name,
        string description
    );
    event InvestmentMade(
        address indexed investor,
        address indexed bucket,
        uint256 amount
    );

    function createBucket(
        bool _isPublic,
        address[] memory _tokens,
        uint256[] memory _proportions,
        string[] memory _chains,
        string memory _name,
        string memory _description
    ) external {
        Bucket newBucket = new Bucket(
            msg.sender,
            _isPublic,
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
        userToBuckets[msg.sender].push(address(newBucket));
        allBuckets.push(address(newBucket));

        emit BucketCreated(
            msg.sender,
            address(newBucket),
            _isPublic,
            _tokens,
            _proportions,
            _chains,
            _name,
            _description
        );
    }

    function getNumBuckets() external view returns (uint256) {
        return allBuckets.length;
    }

    function getAllBuckets() external view returns (address[] memory) {
        return allBuckets;
    }

    function getBucketsByCreator(
        address creator
    ) external view returns (address[] memory) {
        return userToBuckets[creator];
    }

    function getInvestedBuckets(
        address investor
    ) external view returns (address[] memory) {
        return userInvestedBuckets[investor];
    }
}
