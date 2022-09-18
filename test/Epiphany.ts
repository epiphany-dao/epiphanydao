import { Contract } from 'ethers'

const { expect } = require('chai')
const hre = require('hardhat')
const { ethers } = require('hardhat')

// import { Epiphany } from '../contracts/Epiphany'
// const {
//   a0,
//   a1,
//   a2,
//   a3,
//   a4,
//   isPurchaseAllowedSignature,
//   onProductPurchaseSignature,
//   productsModule
// } = require('./setup')

describe('{Epiphany}', () => {
  let myContract
  let slicerId

  it('Contract is deployed and initialized', async () => {
    const EPIPHANY = await ethers.getContractFactory('Epiphany')

    // Deploy contract
    myContract = await EPIPHANY.deploy()
    await myContract.deployed()

    await myContract.contribute(
      '0x78344979959C9d25Beb73748269A2B5533F87a51',
      '0x99B551F0Bb2e634D726d62Bb2FF159a34964976C',
      2,
      300,
      1
    )

    await myContract.mintBatch(
      '0x78344979959C9d25Beb73748269A2B5533F87a51',
      [1, 2, 3],
      [3333, 3333, 3333],
      1
    )

    await myContract.mintEpiphany(
      '0x78344979959C9d25Beb73748269A2B5533F87a51',
      1,
      1
    )
  })

  describe('Reverts', () => {})
})
