$(document).ready(function() {
    var darkMode = true;
    
    
    var name = getCookie("name");
    var email = getCookie("email");
    var phone = getCookie("phone");
    var mode = getCookie("mode");
    checkCookie(name,email,phone)
    if (mode!=""){
        darkMode = mode;
        changeMode(darkMode);
    }
    
    
    
    $("#dark_mode").on("click", function() {
        changeMode(darkMode);

    });
    
    function changeMode(darkMode){
        if (darkMode) {
            $("#wrapper").css({"color":"#fff", "background-color":"#1a1e22"});
            $("#dark_mode").text("Light");
            darkMode = false;
        } else {
            $("#wrapper").css({"color":"#161616", "background-color":"#fff"});
            $("#dark_mode").text("Dark");
            darkMode = true;
        }
    }
    function delCookie(name,email,phone,mode){
        setCookie("name", name, -10);
        setCookie("email", email, -10);
        setCookie("phone", phone, -10);
        setCookie("mode", mode, -10);
    }
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie(name,email,phone) {
        
        $("#name").val(name);
        $("#email").val(email);
        $("#phone").val(phone);
        buildWelcome(name);
    }
    function buildWelcome(name){
        
        if (name != "") {
            
            const logIn = document.createElement("p");
            const nav = document.querySelector("nav");
            logIn.textContent = "Welcome " + name;
            nav.appendChild(logIn);
            $(logIn).addClass("subMenu");
            const logOut = document.createElement("p");
            logOut.textContent = "Log Out";
            logIn.appendChild(logOut);
            $(logOut).on("click", function(){
                delCookie(name,email,phone,mode);
                location.reload();
            });
            
        }

    }
    let nameError = true;
    let phoneError = true;
    let emailError = true;
    

    function validateName() {
        let usernameValue = $('#name').val();
        if (usernameValue.length == '') {
            $("#nameError").text("Please enter your name");
            nameError = false;
            return false;
        }
    }

    function validateEmail() {
        let emailValue = $('#email').val();
        if (emailValue.length == '') {
            $("#emailError").text("Please enter your email");
            emailError = false;
            return false;
        }
    }

    function validatePhone() {
        let phoneValue = $('#phone').val();
        if (phoneValue.length == '') {
            $("#phoneError").text("Please enter your phone number");
            phoneError = false;
            return false;
        }
    }
    $("#submit").on("click", function(e) {
        e.preventDefault();
        validateName();
        validateEmail();
        validatePhone();
        if (nameError == true && emailError == true && phoneError == true) {
            delCookie(name,email,phone,mode);
            setCookie("name", $('#name').val(), 30);
            setCookie("email", $('#email').val(), 30);
            setCookie("phone", $('#phone').val(), 30);
            setCookie("mode", darkMode, 30)
            location.reload();
            return true;
        } else {
            return false;
        }
    });
    $(":reset").on("click", function() {
        $("#emailError").text("");
        $("#nameError").text("");
        $("#phoneError").text("");
    })

})