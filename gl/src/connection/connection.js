
import Peer from 'peerjs';
import { io } from "socket.io-client";



let socketInstance = null;
let peers = {};

const initializePeerConnection = () => {
    return new Peer(undefined, {
        host: "/", 
        port : 9000,     
    });
}



class Connection{
    videoContainer = {};
    message = [];
    settings;
    streaming = null;
    myPeer;
    socket;
    myID = '';
    currentPeer = null
    
    constructor(settings) {
        this.settings = settings;
        this.myPeer = initializePeerConnection();
        this.socket = io("ws://localhost:5000");
        this.initializeSocketEvents();
        this.initializePeersEvents();
        this.connectToNewUser = this.connectToNewUser.bind(this)
    }

    initializeSocketEvents = () => {
        this.socket.on('connect', () => {
            console.log('socket connected');
        });
        
        this.socket.on('user-disconnected', (userID) => {
            console.log('user disconnected-- closing peers', userID);
            peers[userID] && peers[userID].close();
            this.removeVideo(userID);
        });
        this.socket.on('disconnect', () => {
            console.log('socket disconnected --');
        });
        this.socket.on('error', (err) => {
            console.log('socket error while initializing socket event in connection.js--', err);
        });
    }

    initializePeersEvents = () => {
        this.myPeer.on('open', (id) => {
            this.myID = id;
            const roomID = window.location.pathname.split('/')[2];
            const userData = {
                userID: id, roomID
            }
            console.log('peers established and joined room', userData);
            this.socket.emit('join-room', userData);
            this.setNavigatorToStream();
        });
        this.myPeer.on('error', (err) => {
            console.log('peer connection error', err);
            this.myPeer.reconnect();
        })
    }

    setNavigatorToStream = () => {
        this.getVideoAudioStream(true, true).then((stream) => {
            if (stream) {
                this.streaming = stream;
                this.createVideo({ id: this.myID, stream : stream });
                this.setPeersListeners(stream);
                this.newUserConnection(stream);
            }
        })
        .catch(err => console.error("error in setNavigatorToStream : " + err))
    }

    getVideoAudioStream = (video, audio) => {
        let quality = 60;
        if (quality) quality = parseInt(quality);
        const myNavigator = navigator.mediaDevices.getUserMedia || 
        navigator.mediaDevices.webkitGetUserMedia || 
        navigator.mediaDevices.mozGetUserMedia || 
        navigator.mediaDevices.msGetUserMedia;
        return myNavigator({
            video : video ? {
                frameRate: quality ? quality : 12,
                noiseSuppression: true,
                width: {min: 640, ideal: 640, max: 640},
                height: {min: 480, ideal: 480, max: 480}
            } : false,
            audio: audio,
        });
    }

    createVideo = (createObj) => {
        console.log("creating new video");
        if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('room-container');
            const videoContainer = document.createElement('div');
            const video = document.createElement('video');
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            video.autoplay = true;
            // video.play()
            if (this.myID === createObj.id) video.muted = true;
            videoContainer.appendChild(video)
            roomContainer.append(videoContainer);
        } else {
            let obj = document.getElementById(createObj.id)
            if(obj)
                obj.srcObject = createObj.stream;
        }
    }

    setPeersListeners = (stream) => {
        this.myPeer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                console.log('user stream data', userVideoStream)
                this.createVideo({ id: call.metadata.id, stream: userVideoStream });
            });
            call.on('close', () => {
                console.log('closing peers listeners', call.metadata.id);
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.log('peer error ------');
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
        });
    }

    newUserConnection = (stream) => {
        this.socket.on('new-user-connect', (userData) => {
            console.log('New User Connected', userData);
            setTimeout(this.connectToNewUser, 1000, userData, stream)

            // this.connectToNewUser(userData, stream);
        });
    }

    async connectToNewUser(userData, stream) {
        const { userID } = userData;
        const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID }});
        call.on('stream', (userVideoStream) => {
            console.log("connecting to new user : ", userData, "\nuser video stream : ", userVideoStream);
            this.createVideo({ id: userID, stream: userVideoStream, userData });
        });
        call.on('close', () => {
            console.log('closing new user', userID);
            this.removeVideo(userID);
        });
        call.on('error', () => {
            console.log('peer error ------')
            this.removeVideo(userID);
        })
        peers[userID] = call;
    }

    removeVideo = (id) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }
    destoryConnection = () => {
        let myMediaTracks
        if (this.videoContainer[this.myID])
        myMediaTracks= this.videoContainer[this.myID].stream.getTracks();
        if(myMediaTracks)
            myMediaTracks.forEach((track) => {
                track.stop();
            })
        if(socketInstance)
        socketInstance.socket.disconnect();
        this.myPeer.destroy();
    }

}
export function createSocketConnectionInstance(settings={}) {
    return socketInstance = new Connection(settings);
}
