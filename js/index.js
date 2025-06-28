function showSection(id) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// تسجيل المستخدم
function signup() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("message");

  if (!username || !email || !password) {
    message.textContent = "All fields are required.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "All inputs is required.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(user => user.email === email)) {
    message.textContent = "Email already exists.";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  message.style.color = "green";
  message.textContent = "Registered successfully. You can login now.";
  setTimeout(() => {
    showSection("loginSection");
    message.textContent = "";
  }, 1500);
}

// تسجيل الدخول
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("message");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find(user => user.email === email && user.password === password);

  if (!currentUser) {
    message.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  document.getElementById("welcomeMsg").textContent = `Welcome, ${currentUser.username}!`;
  showSection("homeSection");
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem("currentUser");
  showSection("loginSection");
}

// عند تحميل الصفحة، التحقق من حالة المستخدم
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.getElementById("welcomeMsg").textContent = `Welcome, ${user.username}!`;
    showSection("homeSection");
  } else {
    showSection("loginSection");
  }
};

// تعديل زر التسجيل في HTML ليشتغل
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.querySelector("#registerSection button");
  signupBtn.addEventListener("click", signup);
});
