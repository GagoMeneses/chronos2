document.getElementById('showLogin').addEventListener('click', function() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registrationForm').classList.add('hidden');
});

document.getElementById('showRegister').addEventListener('click', function() {
  document.getElementById('registrationForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessage = document.getElementById('registerErrorMessage');

  errorMessage.textContent = '';

  if (!email || !password || !confirmPassword) {
      errorMessage.textContent = 'Todos los campos son obligatorios.';
      return;
  }

  const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordComplexity.test(password)) {
      errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.';
      return;
  }

  if (password !== confirmPassword) {
      errorMessage.textContent = 'Las contraseñas no coinciden.';
      return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          var user = userCredential.user;

          return db.collection('users').doc(user.uid).set({
              email: user.email,
              uid: user.uid,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
      })
      .then(() => {
          alert('Registro exitoso');
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById('registerErrorMessage').textContent = errorMessage;
      });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorMessage = document.getElementById('loginErrorMessage');

  errorMessage.textContent = '';

  if (!email || !password) {
      errorMessage.textContent = 'Todos los campos son obligatorios.';
      return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          var user = userCredential.user;

          // Guardar información del usuario en localStorage
          localStorage.setItem('user', JSON.stringify({
              email: user.email,
              uid: user.uid
          }));

          alert('Inicio de sesión exitoso');
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById('loginErrorMessage').textContent = errorMessage;
      });
});

document.getElementById('googleLogin').addEventListener('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
      .then((result) => {
          var user = result.user;

          // Guardar información del usuario en localStorage
          localStorage.setItem('user', JSON.stringify({
              email: user.email,
              uid: user.uid
          }));

          alert('Inicio de sesión con Google exitoso');
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById('loginErrorMessage').textContent = errorMessage;
      });
});
