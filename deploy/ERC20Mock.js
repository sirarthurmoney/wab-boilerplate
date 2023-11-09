module.exports = async function ({ deployments, getNamedAccounts }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`Deployer address: ${deployer}`)

	const ENV_TEST_TOKENS = {
		"ethereum-testnet": {
			"USDC": {
				"contractName": "USDC",
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
			"USDT": {
				"contractName": "USDT",
				"name": "USDT Mock",
				"symbol": "USDT",
				"decimals": "6"
			},
		},
		"arbitrum-testnet": {
			"USDC": {
				"contractName": "USDC",
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			}
		}
	}


	const tokensArray = Object.keys(ENV_TEST_TOKENS[hre.network.name])
	for (const token of tokensArray) {
		// console.log(
		// 	ENV_TEST_TOKENS[hre.network.name][token].name,
		// 	ENV_TEST_TOKENS[hre.network.name][token].symbol,
		// 	ENV_TEST_TOKENS[hre.network.name][token].decimals
		// )
		await deploy(token, {
			contract: "ERC20Mock",
			from: deployer,
			args: [
				ENV_TEST_TOKENS[hre.network.name][token].name,
				ENV_TEST_TOKENS[hre.network.name][token].symbol,
				ENV_TEST_TOKENS[hre.network.name][token].decimals
			],
			log: true,
			waitConfirmations: 1,
			skipIfAlreadyDeployed: true
		})
	}
}

module.exports.tags = ["ERC20Mock"]