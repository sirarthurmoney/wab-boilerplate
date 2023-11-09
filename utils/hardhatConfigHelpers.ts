import 'dotenv/config'
import * as fs from 'fs'
import { RPCS } from "@layerzerolabs/lz-sdk"
import {
    ChainType,
    ENVIRONMENT,
    EndpointId,
    Environment,
    Stage,
    endpointIdToNetwork,
    networkToChain,
    networkToStage,
    networkToEndpointId
} from '@layerzerolabs/lz-definitions'
import fetch from "node-fetch"


// example: MNEMONIC=xxx, MNEMONIC_ETHEREUM=xxx
export function getMnemonic(network?: string) {
    if (network) {
        const mnemonic = process.env['MNEMONIC_' + network.toUpperCase()]
        if (mnemonic && mnemonic !== '') {
            return mnemonic
        }
    }

    const mnemonic = process.env.MNEMONIC
    if (!mnemonic || mnemonic === '') {
        return 'test test test test test test test test test test test junk'
    }
    return mnemonic
}

// e.g. ETHEREUM_TESTNET for MNEMONIC_ETHEREUM_TESTNET
export function accounts(endpointKey?: string) {
    console.log({endpointKey})
    return { mnemonic: getMnemonic(endpointKey) }
}

export async function getWorkingProvider(network: string) {
    let chainid
    try {
        chainid = networkToEndpointId(network.toUpperCase(),"v1").toString()
    } catch(e) {
        console.log(`skipping network: ${network}`)
    }

    const url = RPCS[chainid] === undefined ? urls?.[env]?.[chain] : RPCS[chainid][3];
    console.log({url})
    const res = await fetch(url);
    console.log({res})
    if (res.ok) {
        return await url
        const data = await res.json();
        console.log(data);
    } else {
        return await url
    }
}

export function getNetworks(): { [network: string]: any } {
    const urls = require("../constants/node-url.json")
    const networks: { [network: string]: any } = {}
    let networkArray = []
    for (const endpointKey in EndpointId) {
        if (Number(endpointKey) >= 0) {
            const network = endpointIdToNetwork(parseInt(endpointKey))
            networkArray.push(network);
            const [chain, env] = network.split("-")
            let accounts = { mnemonic: getMnemonic(endpointKey) }
            const url = urls?.[env]?.[chain+"-"+env]
            if (url && !(network in networks)) {
                networks[network] = {
                    accounts,
                    url,
                }
            }
        }
    }
//     console.log(JSON.stringify(networkArray))
//     console.log({networks})
    return networks
}