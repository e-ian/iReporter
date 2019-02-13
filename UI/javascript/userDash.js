getUserRedflags();
function getUserRedflags() {
    let userregflagsUrl = "http://127.0.0.1:5000/api/v1/redflags";
    token = localStorage.getItem('access_token')
    console.log(token)
    fetch(userregflagsUrl, {
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(resp => resp.json())
    .then(response => {
        console.log(response)
        let output = `
        <tr class="Usercolumn">
            <th>comment</th>
            <th>created_by</th>
            <th>created_on</th>
            <th>image</th>
            <th>incident_type</th>
            <th>location</th>
            <th>redflag_id</th>
            <th>status</th>
        </tr>`;
        for (let k in response['redflag_list']){
            output += `
            <tr class="Admin-table">
            <td>${response['redflag_list'][k].comment}</td>
            <td>${response['redflag_list'][k].created_by}</td>
            <td>${response['redflag_list'][k].created_on}</td>
            <td>${response['redflag_list'][k].image}</td>
            <td>${response['redflag_list'][k].incident_type}</td>
            <td>${response['redflag_list'][k].location}</td>
            <td>${response['redflag_list'][k].redflag_id}</td>
            <td>${response['redflag_list'][k].status}</td>
            </tr>`}
            document.getElementById('UserRedflags').innerHTML = output;
        });

}

document.getElementById('getSpecific').onclick = function getUserSpecificredflag(){
    let redflag_id = document.getElementById('incidentSearch').value;
    console.log(redflag_id)
    let UserspecRedflagsURL = `http://127.0.0.1:5000/api/v1/redflags/${redflag_id}`;
    console.log(UserspecRedflagsURL)
    token = localStorage.getItem('access_token')
    fetch(UserspecRedflagsURL, {
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`
        }
    })    
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.message === 'Redflag not found'){
            alert(response.message);} 
        else{
            let output = ''            
                output += `
                <div class="Create-record">
                    <form id="IntForm" method="PUT">
                    <h2>Redflag: ${redflag_id}</h2>
                    <p>comment: ${response['redflag'].comment}</p>
                    <p>created_by: ${response['redflag'].created_by}</p>
                    <p>created_on: ${response['redflag'].created_on}</p>
                    <p>image: ${response['redflag'].image}</p>
                    <p>incident_type: ${response['redflag'].incident_type}</p>
                    <p>location: ${response['redflag'].location}</p>
                    <p>redflag_id: ${response['redflag'].redflag_id}</p>
                    <p>status: ${response['redflag'].status}</p>
                    <input id="redflag_id" value=${redflag_id} class="login-input">
                    <input type="text" id="comment" placeholder="edit comment" class="login-input">
                    <input type="text" id="location" placeholder="edit location" class="login-input">
                    <input type="button" class="btn" onclick="editRedflagComment()" value="edit comment">
                    <input type="button" class="btn" onclick="editRedflagLocation()" value="edit location">
                    </form>
                </div>`;
                console.log(output);         
            
            document.getElementById('popUp').innerHTML = output;
            document.getElementById('popUp').style.display = 'block';
        }
    })
}

function editRedflagComment(){
    var update_comment = {
        comment: document.getElementById("comment").value
    }
    redflag_id = document.getElementById("redflag_id").value
    fetch(`http://127.0.0.1:5000/api/v1/redflags/${redflag_id}/comment`,{
        method: 'PATCH',
        body: JSON.stringify(update_comment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.status === 200){
            document.getElementById('msg').innerHTML = `${response.message}`            
        }
        window.location.replace('userprofile.html')
    })
}

function editRedflagLocation(){
    var update_location = {
        location: document.getElementById("location").value
    }
    redflag_id = document.getElementById("redflag_id").value
    fetch(`http://127.0.0.1:5000/api/v1/redflags/${redflag_id}/location`,{
        method: 'PATCH',
        body: JSON.stringify(update_location),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.status === 200){
            document.getElementById('msg').innerHTML = `${response.message}`
        }
        window.location.replace('userprofile.html')
    })
}

CreateRedflag();
function CreateRedflag(){
    var post_redflag = {
        incident_type: document.getElementById("incident_type").value,
        location: document.getElementById("location").value,
        status: document.getElementById("status").value,
        image: document.getElementById("image").value,
        comment: document.getElementById("comment").value
    }
    fetch(`http://127.0.0.1:5000/api/v1/redflags`,{
        method: 'POST',
        body: JSON.stringify(post_redflag),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.status === 201){
            document.getElementById('mssg').innerHTML = `${response.message}`
        }
        window.location.replace('userprofile.html')
        })
}