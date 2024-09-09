const cities = [
    "Caçapava",
    "Igaratá",
    "Jacareí",
    "Jambeiro",
    "Monteiro Lobato",
    "Paraibuna",
    "Santa Branca",
    "São José dos Campos",
    "Campos do Jordão",
    "Lagoinha",
    "Natividade da Serra",
    "Pindamonhangaba",
    "Redenção da Serra",
    "Santo Antônio do Pinhal",
    "São Bento do Sapucaí",
    "São Luiz do Paraitinga",
    "Taubaté",
    "Tremembé",
    "Aparecida",
    "Cachoeira Paulista",
    "Canas",
    "Cunha",
    "Guaratinguetá",
    "Lorena",
    "Piquete",
    "Potim",
    "Roseira",
    "Arapeí",
    "Areias",
    "Bananal",
    "Cruzeiro",
    "Lavrinhas",
    "Queluz",
    "São José do Barreiro",
    "Silveiras",
    "Caraguatatuba",
    "Ilhabela",
    "São Sebastião",
    "Ubatuba"
];

document.getElementById("buttonTypeConfirm").addEventListener('click', () => {
    document.getElementById(`${document.querySelector("input[name='radioType']:checked").id == "checkDonor" ? "signUpDonor" : "signUpInstitution"}`).style.display = "flex";
    NewUser.type = document.querySelector("input[name='radioType']:checked").id == "checkDonor" ? "Donor" : "Institution";
    document.getElementById("typeAccount").style.display = "none";
});
class User {
    constructor() {
        type = undefined;
        firstNameUser = undefined;
        lastNameUser = undefined;
        dateUser = undefined;
        genderUser = undefined;
        emailUser = undefined;
        passwordUser = undefined;
        addressUser = undefined;
    };
};
class NewUser extends User {
    constructor() {};
};
document.getElementById("secondLevelSignUpDonor").style.display = "none";
document.getElementById("thirdLevelSignUpDonor").style.display = "none";
document.getElementById("secondLevelSignUpInstitution").style.display = "none";
document.getElementById("thirdLevelSignUpInstitution").style.display = "none";
document.getElementById("buttonFirstLevelConfirmDonor").addEventListener('click', () => {
    let firstName = document.querySelector("#firstNameDonor").value;
    let lastName = document.querySelector("#lastNameDonor").value;
    let date = document.querySelector("#dateUserDonor").value;
    date = date.split("-");
    let gender = document.querySelector("#selectGenderDonor").value;
    const dateNow = new Date();
    document.getElementById("firstAlertDataUserDonor").innerHTML = "";
    if (firstName.length > 1 && firstName.length < 31) {
        if (lastName.length > 1 && lastName.length < 71) {
            if ((parseInt(dateNow.getFullYear()) - parseInt(date[0]) > 18 && parseInt(dateNow.getFullYear()) - parseInt(date[0]) < 117) || (parseInt(dateNow.getFullYear()) - parseInt(date[0]) == 18 && (parseInt(date[1]) < parseInt(dateNow.getMonth() + 1) || (parseInt(date[1]) == parseInt(dateNow.getMonth() + 1) && parseInt(date[2]) <= parseInt(dateNow.getDate()))))) {
                NewUser.firstNameUser = firstName;
                NewUser.lastNameUser = lastName;
                NewUser.dateUser = date.join("-");
                NewUser.genderUser = gender;
                document.getElementById("firstLevelSignUpDonor").style.display = "none";
                document.getElementById("secondLevelSignUpDonor").style.display = "flex";
            } else {
                document.getElementById("firstAlertDataUserDonor").innerHTML = "Data inválida";
            };
        } else {
            document.getElementById("firstAlertDataUserDonor").innerHTML = "Sobrenome inválido";
        };
    } else {
        document.getElementById("firstAlertDataUserDonor").innerHTML = "Nome inválido";
    };
});
document.getElementById("buttonSecondLevelConfirmDonor").addEventListener('click', () => {
    let email = document.querySelector("#emailUserDonor").value;
    let confirmEmail = document.querySelector("#confirmEmailUserDonor").value;
    let password = document.querySelector("#passwordUserDonor").value;
    let confirmPassword = document.querySelector("#confirmPasswordUserDonor").value;
    document.getElementById("secondAlertDataUserDonor").innerHTML = "";
    if (email.includes("@gmail.com") || email.includes("@outlook.com") || email.includes("@yahoo.com")) {
        if (email == confirmEmail) {
            if (password.length > 6 && password.length < 17) {
                if (password == confirmPassword) {
                    NewUser.emailUser = email;
                    NewUser.passwordUser = password;
                    document.getElementById("secondLevelSignUpDonor").style.display = "none";
                    document.getElementById("thirdLevelSignUpDonor").style.display = "flex";
                } else {
                    document.getElementById("secondAlertDataUserDonor").innerHTML = "Senhas diferentes";
                };
            } else {
                document.getElementById("secondAlertDataUserDonor").innerHTML = "Senha inválida";
            };
        } else {
            document.getElementById("secondAlertDataUserDonor").innerHTML = "Emails diferentes";
        };
    } else {
        document.getElementById("secondAlertDataUserDonor").innerHTML = "Email inválido";
    };
});
document.getElementById("cepUserDonor").addEventListener('keyup', () => {
    let cep = document.querySelector("#cepUserDonor").value;
    cep.length > 5 && !cep.includes("-") ? cep = `${cep.substring(0, 5)}-${cep.substring(5)}` : false
    document.querySelector("#cepUserDonor").value = cep;
    if (cep.length == 9) {
        cep = cep.replace("-", "");
        !isNaN(parseFloat(cep)) && isFinite(cep) && cep.length == 8 ? ApiCep(cep).then(data => data.erro || !cities.includes(data.localidade) ? false : ShowDataFromApi(data)) : false;
        function ShowDataFromApi(data) {
            document.getElementById("buttonThirdLevelConfirmDonor").addEventListener('click', () => {
                if (document.querySelector("#numberUserDonor").value != '') {
                    NewUser.addressUser = {
                        city: data.localidade,
                        state: data.uf,
                        neighborhood: data.bairro,
                        street: data.logradouro,
                        numberHouse: document.querySelector("#numberUserDonor").value
                    };
                    localStorage.ajudaValeAccount = JSON.stringify({
                        type: NewUser.type,
                        firstNameUser: NewUser.firstNameUser,
                        lastNameUser: NewUser.lastNameUser,
                        dateUser: NewUser.dateUser,
                        genderUser: NewUser.genderUser,
                        emailUser: NewUser.emailUser,
                        passwordUser: NewUser.passwordUser,
                        addressUser: NewUser.addressUser
                    });
                    document.getElementById("signUpDonor").style.display = "none";
                    document.getElementById("finishSignUp").style.display = "flex";
                }; 
            });
            document.getElementById("contentAddressDonor").style.display = "flex"
            document.getElementById("cityUserDonor").innerHTML = data.localidade;
            document.getElementById("stateUserDonor").innerHTML = data.uf;
            document.getElementById("neighborhoodUserDonor").innerHTML = data.bairro;
            document.getElementById("streetUserDonor").innerHTML = data.logradouro;
        };
    };
});
document.getElementById("buttonFirstLevelConfirmInstitution").addEventListener('click', () => {
    let firstName = document.querySelector("#firstNameInstitution").value;
    let lastName = document.querySelector("#lastNameInstitution").value;
    let date = document.querySelector("#dateUserInstitution").value;
    date = date.split("-");
    let gender = document.querySelector("#selectGenderInstitution").value;
    const dateNow = new Date();
    document.getElementById("firstAlertDataUserInstitution").innerHTML = "";
    if (firstName.length > 1 && firstName.length < 31) {
        if (lastName.length > 1 && lastName.length < 71) {
            if ((parseInt(dateNow.getFullYear()) - parseInt(date[0]) > 18 && parseInt(dateNow.getFullYear()) - parseInt(date[0]) < 117) || (parseInt(dateNow.getFullYear()) - parseInt(date[0]) == 18 && (parseInt(date[1]) < parseInt(dateNow.getMonth() + 1) || (parseInt(date[1]) == parseInt(dateNow.getMonth() + 1) && parseInt(date[2]) <= parseInt(dateNow.getDate()))))) {
                NewUser.firstNameUser = firstName;
                NewUser.lastNameUser = lastName;
                NewUser.dateUser = date.join("-");
                NewUser.genderUser = gender;
                document.getElementById("firstLevelSignUpInstitution").style.display = "none";
                document.getElementById("secondLevelSignUpInstitution").style.display = "flex";
            } else {
                document.getElementById("firstAlertDataUserInstitution").innerHTML = "Data inválida";
            };
        } else {
            document.getElementById("firstAlertDataUserInstitution").innerHTML = "Sobrenome inválido";
        };
    } else {
        document.getElementById("firstAlertDataUserInstitution").innerHTML = "Nome inválido";
    };
});
document.getElementById("buttonSecondLevelConfirmInstitution").addEventListener('click', () => {
    let email = document.querySelector("#emailUserInstitution").value;
    let confirmEmail = document.querySelector("#confirmEmailUserInstitution").value;
    let password = document.querySelector("#passwordUserInstitution").value;
    let confirmPassword = document.querySelector("#confirmPasswordUserInstitution").value;
    document.getElementById("secondAlertDataUserInstitution").innerHTML = "";
    if (email.includes("@gmail.com") || email.includes("@outlook.com") || email.includes("@yahoo.com")) {
        if (email == confirmEmail) {
            if (password.length > 6 && password.length < 17) {
                if (password == confirmPassword) {
                    NewUser.emailUser = email;
                    NewUser.passwordUser = password;
                    document.getElementById("secondLevelSignUpInstitution").style.display = "none";
                    document.getElementById("thirdLevelSignUpInstitution").style.display = "flex";
                } else {
                    document.getElementById("secondAlertDataUserInstitution").innerHTML = "Senhas diferentes";
                };
            } else {
                document.getElementById("secondAlertDataUserInstitution").innerHTML = "Senha inválida";
            };
        } else {
            document.getElementById("secondAlertDataUserInstitution").innerHTML = "Emails diferentes";
        };
    } else {
        document.getElementById("secondAlertDataUserInstitution").innerHTML = "Email inválido";
    };
});
document.getElementById("cepUserInstitution").addEventListener('keyup', () => {
    let cep = document.querySelector("#cepUserInstitution").value;
    cep.length > 5 && !cep.includes("-") ? cep = `${cep.substring(0, 5)}-${cep.substring(5)}` : false
    document.querySelector("#cepUserInstitution").value = cep;
    if (cep.length == 9) {
        cep = cep.replace("-", "");
        !isNaN(parseFloat(cep)) && isFinite(cep) && cep.length == 8 ? ApiCep(cep).then(data => data.erro || !cities.includes(data.localidade) ? false : ShowDataFromApi(data)) : false;
        function ShowDataFromApi(data) {
            document.getElementById("buttonThirdLevelConfirmInstitution").addEventListener('click', () => {
                if (document.querySelector("#numberUserInstitution").value != '') {
                    NewUser.addressUser = {
                        city: data.localidade,
                        state: data.uf,
                        neighborhood: data.bairro,
                        street: data.logradouro,
                        numberHouse: document.querySelector("#numberUserInstitution").value
                    };
                    localStorage.ajudaValeAccount = JSON.stringify({
                        type: NewUser.type,
                        firstNameUser: NewUser.firstNameUser,
                        lastNameUser: NewUser.lastNameUser,
                        dateUser: NewUser.dateUser,
                        genderUser: NewUser.genderUser,
                        emailUser: NewUser.emailUser,
                        passwordUser: NewUser.passwordUser,
                        addressUser: NewUser.addressUser
                    });
                    document.getElementById("signUpInstitution").style.display = "none";
                    document.getElementById("finishSignUp").style.display = "flex";
                }; 
            });
            document.getElementById("contentAddressInstitution").style.display = "flex"
            document.getElementById("cityUserInstitution").innerHTML = data.localidade;
            document.getElementById("stateUserInstitution").innerHTML = data.uf;
            document.getElementById("neighborhoodUserInstitution").innerHTML = data.bairro;
            document.getElementById("streetUserInstitution").innerHTML = data.logradouro;
        };
    };
});
function ApiCep(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(e => e.json());
};
document.getElementById("buttonFinishSignUp").addEventListener('click', () => open("http://127.0.0.1:5500/home"));