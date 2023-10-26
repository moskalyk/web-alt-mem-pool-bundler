#![allow(non_snake_case)]
use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

module_manifest!();

pub fn main() {}

use std::sync::Mutex;

// Wrap the Vec in a Mutex
static PEERS: Mutex<Vec<String>> = Mutex::new(Vec::new());

#[marine]
pub fn get_peers() -> Vec<String> {
    let peers = PEERS.lock().unwrap();
    peers.clone()
}

#[marine]
pub fn add_peer(peer: String) -> String {
    let peer_str = format!("added {:?}", &peer);
    let mut peers = PEERS.lock().unwrap();
    peers.push(peer);
    peer_str
}

#[marine]
pub fn remove_peer(peer: String) -> String {
    let mut peers = PEERS.lock().unwrap();

    // Remove the peer if it exists. This removes the first occurrence.
    if let Some(pos) = peers.iter().position(|x| x == &peer) {
        peers.remove(pos);
    }

    format!("removed {:?}", &peer)
}

#[marine]
pub fn clear() -> String {
    let mut peers = PEERS.lock().unwrap();
    peers.clear();
    format!("cleared")
}