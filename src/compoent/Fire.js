import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcUAVnu62eNeN5VpSkGiTsxf8oVlFFyTA",
    authDomain: "signinformjs789.firebaseapp.com",
    databaseURL: "https://signinformjs789.firebaseio.com",
    projectId: "signinformjs789",
    storageBucket: "signinformjs789.appspot.com",
    messagingSenderId: "698314348226"
  };
const Fire = firebase.initializeApp(config);
export default Fire;
