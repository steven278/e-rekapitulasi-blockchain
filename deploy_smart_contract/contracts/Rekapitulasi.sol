//SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract Rekapitulasi {
    address public owner; //contract owner wallet address

    //store recapitulation
    struct VoteResult{
        uint16 pemilihTerdaftar;
        uint16 penggunaHakPilih;
        uint16 suaraPaslon1;
        uint16 suaraPaslon2;
        uint16 jumlahSeluruhSuaraSah;
        uint16 jumlahSuaraTidakSah;
        uint16 jumlahSuaraSahDanTidakSah;
        uint8 isSubmitted; 
        address KPPSWallet;
        string formImageHash;
    }

    mapping(uint256 => VoteResult) voteResults; // map every TPS by TPS_ID

    constructor(){
        owner = msg.sender; // initiate contract owner
    }

    //register officer's wallet 
    function registerWalletOfficer(address[] calldata _walletAddress, uint256[] calldata _TPS_ID) external payable {

        // only contract owner able to register officer's wallet
        require(msg.sender == owner, "Error : You are not authorized to create this transaction"); 

        uint256 length = _walletAddress.length;
        unchecked {
            //assign each TPS_ID with corresponding officer's wallet address
            for(uint256 i = 0 ; i < length;){
                voteResults[_TPS_ID[i]].KPPSWallet = _walletAddress[i];
                i++;
            }
        }
    }

    //store vote result
    function storeVoteResult(uint256 _TPS_ID, uint16 _pemilihTerdaftar, uint16 _penggunaHakPilih, uint16 _suaraPaslon1, uint16 _suaraPaslon2, uint16
    _jumlahSeluruhSuaraSah, uint16 _jumlahSuaraTidakSah, uint16 _jumlahSuaraSahDanTidakSah,  string calldata _formImage) external payable{

         //only registered wallet that able to create transaction for specific TPS
         require(voteResults[_TPS_ID].KPPSWallet == msg.sender, "Error : You are not authorized to create this transaction");
         //Every wallet only able to store vote result once
         require(voteResults[_TPS_ID].isSubmitted == 0, "Error : You have already submitted the vote result");

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

    //get recapitulation by TPS_ID
    function getRecapitulationByTpsId(uint256 _TPS_ID) external view returns(VoteResult memory){
        return voteResults[_TPS_ID];
    }

}

//["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"], [110101200101, 110101200102, 110101200103]

// //register officer's wallet 
// function registerWalletOfficer(address _walletAddress, uint256 _TPS_ID) external payable {

//     // only contract owner able to register officer's wallet
//     require(msg.sender == owner, "You are not authorized to create this transaction"); 
//     voteResults[_TPS_ID].KPPSWallet = _walletAddress;
// }


//  110101200101,188,153,20,128,148,5,153,"Qmf6UVuN9zBxuDEyBk4eVmbfK1bGCYhLjs4tw4dFNdGRxm"
//  110101200101,1,1,2,8,1,5,3,"Qmf6UVuN9zBxuDEyBk4eVmbfK1bGCYhLjs4tw4dFNdGRxm"

// contract ErrorHandling {
//     function cattchTheError() public {
//         Rekapitulasi rekap = new Rekapitulasi();
//         try rekap.registerWalletOfficer(address _walletAddress, uint16 _TPS_ID) {
//             //add code here if it works
//         }catch Error(string memory reason){

//         }
//     }
// }

// event AlreadySubmit(string message);
       //  emit AlreadySubmit("You have already submit the vote result");
