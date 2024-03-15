import { task } from 'hardhat/config'
import { DeploymentProperty, getDeploymentProperty } from '../../.deployment/deploymentManager'

/**
 * @notice This task is used to mint a new TalentLayer ID for a given address
 * @param {uint} platformId - the id of the originating platform
 * @param {address} userAddress - The wallet address of the user
 * @param {string} userHandle - The handle of the user
 * @dev Example of script use:
 * npx hardhat mint-pog  --network localhost --address 0xEea268c48a54d6434EAAC9C15B9301B13B58Ca09 --hackathonid 1 --eventid 1 --charityid 1 --handle martin --datauri uiuiuiuiuiuiu
 */
task('mint-pog', 'Mint a proof of Give')
  .addParam('address', 'The address of the user')
  .addParam('hackathonid', "The hackathon's id")
  .addParam('eventid', "The event's id")
  .addParam('charityid', "The charity's id")
  .addParam('handle', 'The giver handle')
  .addParam('datauri', 'The data uri')

  .setAction(async (taskArgs, { network, ethers }) => {
    const { address, hackathonid, eventid, charityid, handle, datauri } = taskArgs

    const proofOfGive = await ethers.getContractAt(
      'ProofOfGive',
      getDeploymentProperty(network.name, DeploymentProperty.ProofOfGive),
    )

    // Assuming the contract uses msg.sender for the user's address, otherwise, you might need to adjust
    const tx = await proofOfGive.mintPoG(address, hackathonid, eventid, charityid, handle, datauri)

    // Wait for the transaction to be mined
    await tx.wait()

    // Assuming there's a way to get the ID post-minting, and it uses the transaction sender's address
    // Adjust the logic here based on how your contract tracks IDs or if there's another method to retrieve it
    console.log(`Minted proof of Give for handle ${handle} on network ${network.name}`)
  })
