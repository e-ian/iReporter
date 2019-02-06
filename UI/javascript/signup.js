function Signup() {
    var register = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value
    }

    fetch('http://127.0.0.1:5000/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (res){
            console.log(res)
            return res.json();
        })        
        .then(function (response){
            var res_data = response
            if (res_data.status === 400){
                document.getElementById('error').innerHTML = `${res_data.message}`
            }
            else if (res_data.status === 201) {
                document.getElementById('error').style.display = 'none'
                window.location.href = 'login.html';
            }
        })
}