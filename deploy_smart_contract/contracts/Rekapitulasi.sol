//SPDX-License-Identifier: MIT

/// @author Steven Lie
pragma solidity 0.8.18;

contract Rekapitulasi {
    address public owner; //contract owner wallet address
    bool public isRegistered; //wallet address registration status

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
        isRegistered = false;
    }

    //register officer's wallet 
    function registerWalletOfficer(address[] calldata _walletAddress, uint256[] calldata _TPS_ID) 
    external payable {
        // only contract owner able to register officer's wallet
        require(msg.sender == owner, "You are not authorized to create this transaction"); 
        // contract owner only able to register officer's wallet once
        require(isRegistered == false, "You have already registered the officer wallets"); 

        uint256 length = _walletAddress.length;
        unchecked {
            //assign each TPS_ID with corresponding officer's wallet address
            for(uint256 i = 0 ; i < length;){
                voteResults[_TPS_ID[i]].KPPSWallet = _walletAddress[i];
                i++;
            }
        }
        isRegistered = true;
    }

    //store vote result
    function storeVoteResult(uint256 _TPS_ID, uint16 _pemilihTerdaftar, uint16 _penggunaHakPilih,
    uint16 _suaraPaslon1, uint16 _suaraPaslon2, uint16 _jumlahSeluruhSuaraSah, uint16 _jumlahSuaraTidakSah, 
    uint16 _jumlahSuaraSahDanTidakSah,  string calldata _formImage) external payable {

         //only registered wallet that able to create transaction for specific TPS
         require(voteResults[_TPS_ID].KPPSWallet == msg.sender, 
         "You are not authorized to create this transaction");

         //Every wallet only able to store vote result once
         require(voteResults[_TPS_ID].isSubmitted == 0, "You have already submitted the vote result");

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