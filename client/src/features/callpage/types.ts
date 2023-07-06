import Peer from "simple-peer";

export interface IPeer {
  peerId: string;
  userName: string;
  peer: Peer.Instance;
}
