"use client";

import React, { useEffect } from "react";
import { firestore } from "@/lib/firebase";
import { useState } from "react";

const TestingPage = () => {
  const [pc, setPc] = useState(null);

  let localStream;
  let remoteStream;

  // Set up peer connection
  useEffect(() => {
    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };
    let temp = new RTCPeerConnection(servers);
    setPc(temp);
  }, []);

  const makeCall = async () => {
    // Reference firestore collection
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // Get candidates for caller and receiver
    const callInput = document.getElementById("callInput");

    callInput.value = callDoc.id;

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp, // Session Description Protocol
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When an answer is created
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    const callId = document.getElementById("callInput").value;
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const webcam = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    remoteStream = new MediaStream();

    // Pushing tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        console.log("Track added to remote stream");
      });
    };

    document.getElementById("remoteVideo").srcObject = remoteStream;
    document.getElementById("webcamVideo").srcObject = localStream;
  };

  return (
    <div>
      TestingPage
      <div className="flex my-4">
        <video id="webcamVideo" autoPlay playsInline></video>
        <video id="remoteVideo" autoPlay playsInline></video>
      </div>
      <div className="flex justify-center">
        <button
          className=" bg-red-500 p-3 rounded-3xl text-white font-bold mr-2 "
          id="webcamButton"
          onClick={webcam}
        >
          Open Webcam
        </button>
        <button
          className=" bg-green-500 p-3 rounded-3xl text-white font-bold mr-2 "
          id="callButton"
          onClick={makeCall}
        >
          Call
        </button>
        <input
          id="callInput"
          className=" border-2 p-4 pr-0 pl-1 w-[100px] border-slate-500 rounded mr-2 "
          placeholder="call input"
        />
        <button
          className=" bg-blue-500 p-3 rounded-3xl text-white font-bold mr-2 "
          id="answerButton"
          onClick={answerCall}
        >
          Answer
        </button>
        <button
          className=" bg-red-500 p-3 rounded-3xl  text-white font-bold place-items-center"
          id="hangupButton"
        >
          Hangup
        </button>
      </div>
    </div>
  );
};

export default TestingPage;
