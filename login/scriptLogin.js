document.getElementById("buttonExit").addEventListener('click', () => open("http://127.0.0.1:5500/home/"));
document.getElementById("btnConfirm").addEventListener('click', () => LoginConfirm(document.querySelector("#emailInput").value, document.querySelector("#passwordInput").value));
let emailAccount = JSON.parse(localStorage.ajudaValeAccount).emailUser;
let passwordAccount = JSON.parse(localStorage.ajudaValeAccount).passwordUser;
function LoginConfirm(email, password) {
    let confirm = [];
    confirm.push(emailAccount == email ? true : false);
    confirm.push(passwordAccount == password ? true : false);
    document.getElementById("emailInput").style.border = "0px";
    document.getElementById("passwordInput").style.border = "0px";
    if (confirm.indexOf(false) >= 0) {
        document.getElementById(confirm.indexOf(false) == 0 ? "emailInput" : "passwordInput").style.border = "2px solid brown";
    } else {
        open("http://127.0.0.1:5500/principal-page/indexPrincipalPage.html");
    };
};