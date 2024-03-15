import { setDeploymentProperty, DeploymentProperty } from '../../.deployment/deploymentManager'
import { task } from 'hardhat/config'
import { verifyAddress } from '../../utils/verifyAddress'
import dotenv from 'dotenv'
dotenv.config()

task('deploy', 'Deploy all contracts')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, network }) => {
    const { verify } = args
    console.log('Network:', network.name)

    const [deployer] = await ethers.getSigners()
    console.log('Using address: ', deployer.address)

    const balance = await ethers.provider.getBalance(deployer.address)
    console.log('Balance: ', ethers.utils.formatEther(balance))

    // Deploy HackathonID

    // const HackathonID = await ethers.getContractFactory('HackathonID')
    // const hackathonIDArg: [] = []
    // const hackathonID = await HackathonID.deploy(...hackathonIDArg)

    // await hackathonID.deployed()

    // if (verify) {
    //   await verifyAddress(hackathonID.address, hackathonIDArg)
    // }

    // console.log('Deployed HackathonID at', hackathonID.address)
    // setDeploymentProperty(network.name, DeploymentProperty.HackathonID, hackathonID.address)

    // Deploy Proof Of Give Contract

    // const ProofOfGive = await ethers.getContractFactory('ProofOfGive')
    // const proofOfGiveArg: [string] = [hackathonID.address]
    // const proofOfGive = await ProofOfGive.deploy(...proofOfGiveArg)

    // await proofOfGive.deployed()

    // if (verify) {
    //   await verifyAddress(proofOfGive.address, proofOfGiveArg)
    // }

    // console.log('Deployed ProofOfGive at', proofOfGive.address)

    // setDeploymentProperty(network.name, DeploymentProperty.ProofOfGive, proofOfGive.address)

    // Deploy Chiliz ERC20 Token

    const PogToken = await ethers.getContractFactory('PogToken')
    const pogTokenArg: [] = []
    const pogToken = await PogToken.deploy(...pogTokenArg)

    await pogToken.deployed()

    if (verify) {
      await verifyAddress(pogToken.address, pogTokenArg)
    }

    console.log('Deployed PoG Token at', pogToken.address)

    setDeploymentProperty(network.name, DeploymentProperty.PogToken, pogToken.address)
  })
