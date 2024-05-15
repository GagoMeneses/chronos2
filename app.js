// Your Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyAtzwHZNdsRgFLcjYMoOqat1UwXKL9-OwU",
    authDomain: "chronos2-delta.firebaseapp.com",
    projectId: "chronos2-delta",
    storageBucket: "chronos2-delta.appspot.com",
    messagingSenderId: "860021741595",
    appId: "1:860021741595:web:0a7558a86cacf3fea840be"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert('User registered successfully!');
            window.location = 'welcome.html'; // Redirect to welcome page
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});

// Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert('User logged in successfully!');
            window.location = 'welcome.html'; // Redirect to welcome page
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});
