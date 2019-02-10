function login(){
    var login_credentials = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
    }
    username = document.getElementById("username").value
    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(login_credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (res){
            console.log(res)
            return res.json();
        })
        .then(function (response){
            var response_data = response
            if (response_data.status === 400){
                document.getElementById('error').innerHTML = `${response_data.message}`
            }
            else if (username === "ogwal") {
                window.alert('Admin logged in successfully')
                console.log(response_data.access_token)
                localStorage.setItem("access_token", response_data.access_token)
                window.location.href = "admin.html";                                
            }
            else if (response_data.status === 200) {
                window.alert('login successful')
                console.log(response_data.access_token)
                localStorage.setItem("access_token", response_data.access_token)
                window.location.href = "userprofile.html";
            }
        })
}

// function setCookie(access_token, value, expiry){
//     var delay = new Date();
//     delay.setTime(delay.getTime() + (expiry * 60 * 60 * 1000));
//     var expires = "expires=" + delay.toUTCString();
//     document.cookie = access_token + "=" + expires + ";path=/";
// }

// function getCookie(access_token){
//     var name = access_token + "=";
//     var ca = document.cookie.split(';');
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';')
//     for(var i =0; i <ca.length; i++){
//         var c = ca[i];
//         while (c.charAt(0) == ' '){
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length)
//         }
//     }
//     return "";
// }
