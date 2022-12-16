import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTXB68F2b70wvYcOQtkgDdADBiiG4R--Q",
  authDomain: "outreach-planner-cpe.firebaseapp.com",
  projectId: "outreach-planner-cpe",
  storageBucket: "outreach-planner-cpe.appspot.com",
  messagingSenderId: "379355534849",
  appId: "1:379355534849:web:d108c74d9910c3d0da5200",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
