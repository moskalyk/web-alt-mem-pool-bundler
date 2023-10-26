## web-altpool-bundler-v1
A demo example for using browsers as an in-memory shared state with a fluence aquamarine peer supporting as a registry for live connections 

## uses
- account abstraction alt mempool aggregation
- storing in-memory media files

## testing
compiling aqua code with `$ fluence aqua` yields in following file: [main.ts](./fluence/_aqua/main.ts) 

compiling with `$ aqua -i fluence/src/aqua/test.aqua -o fluence/_aqua` yields the following file [test.ts](./fluence/_aqua/test.ts) with no `registerAltMemPool` handler

# technologies used
- @fluencelabs/cli/0.9.1 linux-x64 node-v18.14.2
- aqua version 0.9.4

## assistance 
Special thinks for [this Transport-Union](https://github.com/Transport-Union/fluence-introduction) tutorial to help get started

## todo
- add an expiry (find optimal time period) to peerIds
- add a spell to clear old sessions
- implement peer subnets