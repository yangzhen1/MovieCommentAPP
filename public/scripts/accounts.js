if (window.localStorage.getItem('email')) {
  tab(3)
} else {
  tab(2)
}

function tab(val) {
  document.getElementById(`tab-1`).style.backgroundColor = ''
  document.getElementById(`tab-2`).style.backgroundColor = ''
  document.getElementById(`login`).style.display = 'none'
  document.getElementById(`register`).style.display = 'none'
  document.getElementById(`accounts`).style.display = 'none'
  document.getElementById(`tabs`).style.display = 'flex'

  if (val === 2) {
    const element = document.getElementById(`tab-${val}`);
    element.style.backgroundColor = '#FFD362';
    document.getElementById(`login`).style.display = 'flex'
  } else if (val === 1) {
    const element = document.getElementById(`tab-${val}`);
    element.style.backgroundColor = '#FFD362';
    document.getElementById(`register`).style.display = 'flex'
  } else if (val === 3) {
    document.getElementById(`accounts`).style.display = 'flex'
    document.getElementById(`tabs`).style.display = 'none'
    document.getElementById(`accounts-email`).value = window.localStorage.getItem('email')
  }
  document.getElementById('mask').style.display = 'none';
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  if (!email || email.trim() === '') {
    alert('Please enter a valid email address');
    return;
  }
  if (!password || password.trim() === '') {
    alert('Please enter a valid password');
    return;
  }
  const auth = firebase.auth();
  document.getElementById('mask').style.display = 'block';
  // auth.useEmulator("http://localhost:9099");
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      window.localStorage.setItem('email', user.email);
      tab(3)
    })
    .finally(() => {
      document.getElementById('mask').style.display = 'none';
    })
}

function register() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const cpassword = document.getElementById('register-cpassword').value;
  if (!email || email.trim() === '') {
    alert('Please enter a valid email address');
    return;
  }
  if (!password || password.trim() === '') {
    alert('Please enter a valid password');
    return;
  }
  if (!cpassword || cpassword.trim() === '') {
    alert('Please enter a valid confirm password')
    return
  }
  if (password !== cpassword) {
    alert('Please enter a valid confirm password')
    return
  }
  const auth = firebase.auth();
  document.getElementById('mask').style.display = 'block';
  // auth.useEmulator("http://localhost:9099");
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    alert('success')
    tab(2)
  })
  .finally(() => {
    document.getElementById('mask').style.display = 'none';
  })
}

function logout() {
  document.getElementById('mask').style.display = 'block';
  window.localStorage.removeItem('email')
  tab(2)
}