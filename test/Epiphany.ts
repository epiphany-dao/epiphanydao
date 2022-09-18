import { expect } from 'chai'
import { ethers } from 'hardhat'
import { createSlicer, createProduct } from '../../utils'
import { Epiphany } from '../contracts/Epiphany'
import {
  a0,
  a1,
  a2,
  a3,
  a4,
  isPurchaseAllowedSignature,
  onProductPurchaseSignature,
  productsModule
} from './setup'

describe('{Epiphany}', () => {
  let myContract: Epiphany
  let slicerId: number

  it('Contract is deployed and initialized', async () => {
    const EPIPHANY = await ethers.getContractFactory('Epiphany')

    // Create slicer
    const { tokenId } = await createSlicer(
      [
        { account: a0, shares: 90 },
        { account: a1, shares: 10 }
      ],
      20,
      0,
      0,
      [],
      false
    )
    slicerId = tokenId

    // Deploy contract
    myContract = (await EPIPHANY.deploy(
      productsModule.address,
      slicerId
    )) as Epiphany
    await myContract.deployed()

    // Create products

    await createProduct(slicerId, 1, 100, [], true, false, [], {
      externalAddress: myContract.address,
      checkFunctionSignature: isPurchaseAllowedSignature,
      execFunctionSignature: onProductPurchaseSignature,
      data: [],
      value: ethers.utils.parseEther('0')
    })
  })

  describe('isPurchaseAllowed', () => {
    it('Returns true if allowed', async () => {
      const isAllowedA1 = await myContract.isPurchaseAllowed(
        slicerId,
        1,
        a1,
        1,
        [],
        []
      )

      expect(isAllowedA1).to.be.equal(true)
    })

    it('Returns false if not allowed', async () => {
      const isAllowedA4 = await myContract.isPurchaseAllowed(
        slicerId,
        1,
        a4,
        1,
        [],
        []
      )

      expect(isAllowedA4).to.be.equal(false)
    })
  })

  describe('Reverts', () => {})
})
