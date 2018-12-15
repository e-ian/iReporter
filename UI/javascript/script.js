function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if (username == "" && password == ""){
        document.getElementById("msg").innerHTML = "Input all required fields for username and password";
    }
    else if(username == ""){
        document.getElementById("msg").innerHTML = "Input your username";
    }
    else if(password == ""){
        document.getElementById("msg").innerHTML = "Input your password"
    }
    else{
        if(username == "admin" && password == "ogwal123"){
            window.location.href ="admin.html";
        }
        else if(username == "user" && password == "emma123"){
            window.location.href = "user.html";
        }
    }
}