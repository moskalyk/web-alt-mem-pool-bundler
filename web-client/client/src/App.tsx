import { useState, useEffect } from 'react'
import './App.css'
import { Fluence } from "@fluencelabs/js-client";
import {
  greeting, getPeers, registerAltPool, writeToPool
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
]

let init = 0; 

const App = () => {
  const [pool, setPool] = useState<any>([])
  const [counter, setCounter] = useState<any>(0)

  const write = async () => {
    const peers = await getPeers()
    console.log(peers)
    peers[0].map(async (peer: any) => {
      const res = await writeToPool({address: '0x', nonce: Date.now()}, peer, true)
      console.log(res)
    })
  };

  const connect = async () => {
    await Fluence.connect(nodes[0].multiaddr, {debug: {printParticleId: true}});
    console.log('connected ',(await Fluence.getClient()).getPeerId())
    const res = await greeting((await Fluence.getClient()).getPeerId())
    console.log(res)
  }

  useEffect(() => {

    var logos = document.querySelectorAll('.logo');

    // Loop through each logo element
    logos.forEach(function(logo) {
        // Update the animation duration to 30s
        if(logo instanceof HTMLElement) {
          // Update the animation duration to 30s
          console.log('changing')
          console.log(pool.length)
          if(pool.length == 0){
            logo.style.animation = `logo-spin infinite 0s linear`;
          }else {
            logo.style.animation = `logo-spin infinite ${30 / pool.length}s linear`;

          }
      }
    });

    setTimeout(() => {
      registerAltPool({
        write: async (peer_id: any, user_op: any, client: any) => {
          console.log('WRITING')
          if(!client){
            const newPool = pool.filter((peer: any) => peer !== user_op.address);
            setPool(newPool);
          }else {
            setPool([...pool, peer_id])
            setCounter(counter+1)
          }
  
          return true
        },
        read: () => {
          const blob: any = []
          return blob
        }
      })
    }, 3000)

    if(!init){
      init++
      connect()
    }
  }, [pool])

    return (
      <>
        <div>
          <a href="https://react.dev" target="_blank">
            <img src={'https://www.freepnglogos.com/uploads/compact-disc-png-logo/clipart-compact-disc-symbol-png-logo-29.png'} className="logo react" alt="React logo" />
          </a>
        </div>
        <div className="card">
          <button onClick={() => {
            write();
          }}>
            count is {pool.length}
          </button>
        </div>
      </>
    )
}

export default App