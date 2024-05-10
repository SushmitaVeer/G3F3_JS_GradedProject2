document.getElementById('login-page').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = 'user';
    var password = 'user';

    var name = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    if (name === username && pass === password) {
        localStorage.setItem('username', name);
        window.location.href = 'resumes.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid Username/Password';
    }
});


//Function to Restrict user from going back to the login page
function restrictBack() {
    window.history.forward();
}
setTimeout("restrictBack()", 0);
window.onunload = function () {
    alert("Back to login page is restricted")
};