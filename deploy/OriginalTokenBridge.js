const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const REMOTE_CHAIN_ID = require("../constants/wireUpConfig.json").proxyContractConfig.chainId
const WETHS = require("../constants/weths.json")
const assert = require("assert");

module.exports = async function ({ deployments, getNamedAccounts, network }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`Deployer address: ${deployer}`)

	const lzEndpointAddress = LZ_ENDPOINTS[network.name]
	assert(lzEndpointAddress !== undefined, "lzEndpointAddress must be defined in layerzeroEndpoints.json");
	console.log(`[${network.name}] Endpoint Address: ${lzEndpointAddress}`)

	const remoteChainId = REMOTE_CHAIN_ID
	assert(remoteChainId !== undefined, "remoteChainId must be defined in wireUpConfig");
	console.log(`[${network.name}] Remote Chain Id: ${remoteChainId}`)

	const weth = WETHS[network.name]
	assert(weth !== undefined, "weth must be defined in weth.json");
	console.log(`[${network.name}] WETH Address: ${weth}`)

	await deploy("OriginalTokenBridge", {
		from: deployer,
		args: [lzEndpointAddress, remoteChainId, weth],
		log: true,
		waitConfirmations: 1,
		skipIfAlreadyDeployed: true
	})
}

module.exports.tags = ["OriginalTokenBridge"]