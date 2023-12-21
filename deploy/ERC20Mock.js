module.exports = async function ({ deployments, getNamedAccounts }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`Deployer address: ${deployer}`)

	const ENV_TEST_TOKENS = {
		"ethereum-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"bsc-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"avalanche-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"polygon-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"arbitrum-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"optimism-testnet": {
			"USDC": {
				"name": "USDC Mock",
				"symbol": "USDC",
				"decimals": "6"
			},
		},
		"fantom-testnet": {
			"USDC": {
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