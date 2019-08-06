import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCX1EMS5fj9Sd40OGaIHCnqWPei7VM3RKA",
    authDomain: "nba-full-ee548.firebaseapp.com",
    databaseURL: "https://nba-full-ee548.firebaseio.com",
    projectId: "nba-full-ee548",
    storageBucket: "nba-full-ee548.appspot.com",
    messagingSenderId: "844154464834",
    appId: "1:844154464834:web:b1cbd35f2770a707"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })

    return data
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}