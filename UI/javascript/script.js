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

