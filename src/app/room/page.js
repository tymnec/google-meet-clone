"use client";

import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function RoomPage() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  // const remoteVideoRef = useRef(null);
  const [remoteVideoRef, setRemoteVideoRef] = useState(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          // remoteVideoRef.current.srcObject = remoteStream;

          document.getElementById("remoteVideo").srcObject = mediaStream;
          document.getElementById("remoteVideo").play();
          // remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="container border shadow rounded-2xl">
      <div className="flex gap-3 place-items-center justify-center m-5">
        <h1 className="font-bold">
          Your id is <span className="font-normal">{peerId}</span>
        </h1>

        {/* Copy Id Button */}
        <button
          onClick={() => navigator.clipboard.writeText(peerId)}
          className="mt-2 p-3 rounded-2xl shadow hover:bg-black hover:text-white"
        >
          Copy Id
        </button>
        {/* <button onClick={() => peerInstance.current.disconnect()}>Disconnect</button> */}
      </div>

      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
        className="border shadow rounded-2xl m-5 p-3"
      />
      <button
        onClick={() => call(remotePeerIdValue)}
        className="mt-2 p-3 rounded-2xl shadow hover:bg-black hover:text-white"
      >
        Call
      </button>
      <div className="border rounded-3xl shadow p-3 m-3">
        <p className="font-bold">Local Video</p>
        <video ref={currentUserVideoRef} />
      </div>
      <div className="border rounded-3xl shadow p-3 m-3">
        <p className="font-bold">Remote Video</p>
        <video id="remoteVideo" />
      </div>
    </div>
  );
}

export default RoomPage;
