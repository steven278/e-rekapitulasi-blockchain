//SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract Rekapitulasi {
    address public owner;

    //store recapitulation
    struct VoteResult{
        uint16 pemilihTerdaftar;
        uint16 penggunaHakPilih;
        uint16 suaraPaslon1;
        uint16 suaraPaslon2;
        uint16 jumlahSeluruhSuaraSah;
        uint16 jumlahSuaraTidakSah;
        uint16 jumlahSuaraSahDanTidakSah;
        uint8 isSubmitted; // taro disini atau di setiap wallet?
        address KPPSWallet; // officer's wallet
        string formImageHash;
    }

    mapping(uint256 => VoteResult) voteResults; // map every TPS

    constructor(){
        owner = msg.sender; // initiate contract owner
    }

    // event Increment(address from, address owner, bool isEqual); 
    // event Equal(bool result, string message, address from, address owner);
    // event NotEqual(bool result, string message, address from, address owner);

    //register officer's wallet 
    function registerWalletOfficer(address _walletAddress, uint256 _TPS_ID) external payable {
        // if(msg.sender == owner){
        //     emit Equal(msg.sender == owner, "same", msg.sender, owner);
        // }else{
        //     emit NotEqual(msg.sender == owner, "not the same", msg.sender, owner);
        // }
        // emit Increment(msg.sender, owner, msg.sender == owner); 
        //  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",110101200101
        // only contract owner able to register officer's wallet
        require(msg.sender == owner, "You are not authorized to create this transaction"); 
        voteResults[_TPS_ID].KPPSWallet = _walletAddress;
    }
    
    //store vote result
    function storeVoteResult(uint256 _TPS_ID, uint16 _pemilihTerdaftar, uint16 _penggunaHakPilih, uint16 _suaraPaslon1, uint16 _suaraPaslon2, uint16
    _jumlahSeluruhSuaraSah, uint16 _jumlahSuaraTidakSah, uint16 _jumlahSuaraSahDanTidakSah,  string calldata _formImage) external payable{

        //  110101200101,188,153,20,128,148,5,153,"Qmf6UVuN9zBxuDEyBk4eVmbfK1bGCYhLjs4tw4dFNdGRxm"

         //only registered wallet that able to create transaction for specific TPS
         require(voteResults[_TPS_ID].KPPSWallet == msg.sender, "You are not authorized to create this transaction");
         //Every wallet only able to store vote result once
         require(voteResults[_TPS_ID].isSubmitted == 0, "You've already submit the vote result");

        //store each data
         voteResults[_TPS_ID].pemilihTerdaftar = _pemilihTerdaftar;
         voteResults[_TPS_ID].penggunaHakPilih = _penggunaHakPilih;
         voteResults[_TPS_ID].suaraPaslon1 = _suaraPaslon1;
         voteResults[_TPS_ID].suaraPaslon2 = _suaraPaslon2;
         voteResults[_TPS_ID].jumlahSeluruhSuaraSah = _jumlahSeluruhSuaraSah;
         voteResults[_TPS_ID].jumlahSuaraTidakSah = _jumlahSuaraTidakSah;
         voteResults[_TPS_ID].jumlahSuaraSahDanTidakSah = _jumlahSuaraSahDanTidakSah;
         voteResults[_TPS_ID].formImageHash = _formImage;
         voteResults[_TPS_ID].isSubmitted = 1;
    }

    //get rekapitulasi by TPS_ID
    function getRecapitulationByTpsId(uint256 _TPS_ID) external view returns(VoteResult memory){
        return voteResults[_TPS_ID];
    }

    //prefund wallet perlu ??

}

// contract ErrorHandling {
//     function cattchTheError() public {
//         Rekapitulasi rekap = new Rekapitulasi();
//         try rekap.registerWalletOfficer(address _walletAddress, uint16 _TPS_ID) {
//             //add code here if it works
//         }catch Error(string memory reason){

//         }
//     }
// }