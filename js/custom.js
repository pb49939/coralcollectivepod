const goodEmail = 'pbaldwi3@gmail.com'
const badEmail = "badEmail@gmail.com"
const goodPassword = "password"
const badPassword = "passwordBad"
let database;

$(document).ready(function () {
    console.log("doing it")
    firebaseConfig();
});

function firebaseConfig() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBDpq-t-_hmDosRVAj2eyCNO9O4jAH92AM",
        authDomain: "davidrossetter-3face.firebaseapp.com",
        databaseURL: "https://davidrossetter-3face.firebaseio.com",
        projectId: "davidrossetter-3face",
        storageBucket: "davidrossetter-3face.appspot.com",
        messagingSenderId: "314645915576",
        appId: "1:314645915576:web:316d0bf10235be59d7114d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            console.log("signed in! ")
            console.log("email: " + email)
            console.log("userID: " + uid)
            console.log("getting blog posts now")
            database = firebase.database();
            getAllBlogPosts();
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });


    auth(goodEmail, goodPassword);
    //auth(badEmail, badPassword);

}

function auth(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage)
        // ...
    });
}

function getAllBlogPosts() {
    return new Promise((resolve, reject) => {
        var blogPostsRef = database.ref(`/blogPosts/`);
        blogPostsRef.on("value", function (snapshot) {
            const blogPosts = snapshot.val();
            console.log("I got some blog posts");
            console.log(blogPosts);
            resolve(blogPosts);
        });
    });
}





