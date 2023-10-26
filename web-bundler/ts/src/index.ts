import { Fluence } from "@fluencelabs/js-client";

import {
    getPeers, 
    writeToPool
  } from "./main.js";

  const nodes = [
    {
      "peerId": "12D3KooWFbasz6SnGxhPq3KWn8KgNW4asNKskxR5JizMdszM4KCN",
      "multiaddr": "/ip4/127.0.0.1/tcp/9991/ws/p2p/12D3KooWFbasz6SnGxhPq3KWn8KgNW4asNKskxR5JizMdszM4KCN"
    },
    {
      "peerId": "12D3KooWBCAWAGNMfqaBG1kUv49dkK8wSNeiTfGubLLjGQaFBf6z",
      "multiaddr": "/ip4/127.0.0.1/tcp/9992/ws/p2p/12D3KooWBCAWAGNMfqaBG1kUv49dkK8wSNeiTfGubLLjGQaFBf6z"
    },
    {
      "peerId": "12D3KooWEqbHHE1bzk1nJ8LE2Wbm2UaycYjRsSB4CTxDS342Boip",
      "multiaddr": "/ip4/127.0.0.1/tcp/9993/ws/p2p/12D3KooWEqbHHE1bzk1nJ8LE2Wbm2UaycYjRsSB4CTxDS342Boip"
    }
  ];

(async () => {
    await Fluence.connect(nodes[0].multiaddr, {debug: {printParticleId: true}});

    setInterval(async () => {
        const peers = await getPeers()
        peers[0].map(async (peer: any) => {
            // const res = await writeToPool
            const res = await writeToPool({address: peer, nonce: Date.now()}, peer, false)
            console.log(res)
        })
        console.log(peers)
    }, 10000)
})()