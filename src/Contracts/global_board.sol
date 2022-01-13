
pragma solidity ^0.8.0;

contract Global_Board {

    //mapping msg to address
    mapping(address => string) public addressToMsg;

    //array to store msgs
    string[] public msgs;

    constructor(string memory _msg) {
        msgs.push(_msg);
        addressToMsg[msg.sender] = _msg;
    }

    function record(string memory _msg) public {
        msgs.push(_msg);
        addressToMsg[msg.sender] = _msg;
    }

    function recive() public view returns( string[] memory){
        return msgs;
    }

}