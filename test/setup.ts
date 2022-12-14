import { ethers } from 'hardhat'
import { Signer } from 'ethers'

/**
 * @title Setup file
 * @author Dom-Mac
 *
 * @notice contracts are deployed just once before all the tests.
 *
 * @dev
 */

// protocolFee corresponds to 2.5% (0.025)
export const protocolFee = 25
export let addr0: Signer,
  addr1: Signer,
  addr2: Signer,
  addr3: Signer,
  addr4: Signer,
  addr5: Signer,
  addr6: Signer,
  addr7: Signer,
  JBOwner: Signer,
  a0: string,
  a1: string,
  a2: string,
  a3: string,
  a4: string,
  a5: string,
  a6: string,
  a7: string,
  jb: string,
  beacon: string,
  signature721 = '0xfaf2e80e',
  signature1155 = '0x81bfbb80',
  onProductPurchaseSignature = '0xa23fffb9',
  isPurchaseAllowedSignature = '0x95db9368'

before(async () => {
  const [
    address0,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8
  ] = await ethers.getSigners()

  // Deploy empty contracts to get addresses to be hardcoded
  //   let contractSliceCore = await deployUUPS('EmptyUUPS')
  //   let contractProductsModule = await deployUUPS('EmptyUUPS')
  //   let contractFundsModule = await deployUUPS('EmptyUUPS')
  //   let contractSlicerManager = await deployUUPS('EmptyUUPSBeacon', [
  //     contractSliceCore.address
  //   ])

  // Deploy slicer contract
  const CONTRACTBEACON = await ethers.getContractFactory('Slicer')
  const beaconImplementation = await CONTRACTBEACON.deploy()

  // Upgrade empty contracts with logic

  a0 = address0.address
  a1 = address1.address
  a2 = address2.address
  a3 = address3.address
  a4 = address4.address
  a5 = address5.address
  a6 = address6.address
  a7 = address7.address
  jb = address8.address
  addr0 = address0
  addr1 = address1
  addr2 = address2
  addr3 = address3
  addr4 = address4
  addr5 = address5
  addr6 = address6
  addr7 = address7
  JBOwner = address8
  beacon = beaconImplementation.address

  console.log('~~~~~~~~ TESTS ~~~~~~~~ \n')
})
