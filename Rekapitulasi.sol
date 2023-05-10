//SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract Rekapitulasi {
    address public owner;

    //store recapitulation
    struct VoteResult{
        address KPPSWallet;
        uint16 pemilihTerdaftar;
        uint16 penggunaHakPilih;
        uint16 suaraPaslon1;
        uint16 suaraPaslon2;
        uint16 jumlahSeluruhSuaraSah;
        uint16 jumlahSuaraTidakSah;
        uint16 jumlahSuaraSahDanTidakSah;
        string formImageHash;
        bool isSubmitted; // taro disini atau di setiap wallet?
    }

    mapping(uint16 => VoteResult) voteResults;

    constructor(){
        owner = msg.sender;
    }

    //register wallet ???
    function registerWalletOfficer(address _from) public payable {
        require(msg.sender == owner, "This wallet address is not allowed to make transaction");
    }
    
    //get rekapitulasi by TPS_ID
    function getRecapitulationByTpsId(uint16 _TpsId) public view returns(VoteResult memory){
        return voteResults[_TpsId];
    }
    

}