// get all interventions by user
getUserInterventions();
function getUserInterventions() {
    let userinterventionsUrl = "http://127.0.0.1:5000/api/v1/interventions";
    token = localStorage.getItem('access_token')
    console.log(token)
    fetch(userinterventionsUrl, {
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
            <th>intervention_id</th>
            <th>status</th>
        </tr>`;
        for (let k in response['interventions_list']){
            output += `
            <tr class="Admin-table">
            <td>${response['interventions_list'][k].comment}</td>
            <td>${response['interventions_list'][k].created_by}</td>
            <td>${response['interventions_list'][k].created_on}</td>
            <td>${response['interventions_list'][k].image}</td>
            <td>${response['interventions_list'][k].incident_type}</td>
            <td>${response['interventions_list'][k].location}</td>
            <td>${response['interventions_list'][k].intervention_id}</td>
            <td>${response['interventions_list'][k].status}</td>
            </tr>`}
            document.getElementById('UserInterventions').innerHTML = output;
        });

}

// get an intervention by id by user
document.getElementById('getSpecific').onclick = function getUserSpecificintervention(){
    let intervention_id = document.getElementById('incidentSearch').value;
    console.log(intervention_id)
    let UserspecInterventionsURL = `http://127.0.0.1:5000/api/v1/interventions/${intervention_id}`;
    console.log(UserspecInterventionsURL)
    token = localStorage.getItem('access_token')
    fetch(UserspecInterventionsURL, {
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`
        }
    })    
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.message === 'Intervention not found'){
            alert(response.message);} 
        else{
            let output = ''            
                output += `
                <div class="Create-record">
                    <form id="IntForm" method="PUT">
                    <h2>Intervention: ${intervention_id}</h2>
                    <p>comment: ${response['intervention'].comment}</p>
                    <p>created_by: ${response['intervention'].created_by}</p>
                    <p>created_on: ${response['intervention'].created_on}</p>
                    <p>image: ${response['intervention'].image}</p>
                    <p>incident_type: ${response['intervention'].incident_type}</p>
                    <p>location: ${response['intervention'].location}</p>
                    <p>intervention_id: ${response['intervention'].intervention_id}</p>
                    <p>status: ${response['intervention'].status}</p>
                    <input id="intervention_id" value=${intervention_id} class="login-input">
                    <input type="text" id="comment" placeholder="edit comment" class="login-input">
                    <input type="text" id="location" placeholder="edit location" class="login-input">
                    <input type="button" class="btn" onclick="editInterventionComment()" value="edit comment">
                    <input type="button" class="btn" onclick="editInterventionLocation()" value="edit location">
                    <input type="button" class="deletebtn" onclick="deleteIntervention()" value="delete intervention">
                    </form>
                </div>`;
                console.log(output);         
            
            document.getElementById('popUp').innerHTML = output;
            document.getElementById('popUp').style.display = 'block';
        }
    })
}

function editInterventionComment(){
    var patch_comment = {
        comment: document.getElementById("comment").value
    }
    intervention_id = document.getElementById("intervention_id").value
    fetch(`http://127.0.0.1:5000/api/v1/interventions/${intervention_id}/comment`,{
        method: 'PATCH',
        body: JSON.stringify(patch_comment),
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
        window.location.replace('userinterventions.html')
    })
}

function editInterventionLocation(){
    var patch_location = {
        location: document.getElementById("location").value
    }
    intervention_id = document.getElementById("intervention_id").value
    fetch(`http://127.0.0.1:5000/api/v1/interventions/${intervention_id}/location`,{
        method: 'PATCH',
        body: JSON.stringify(patch_location),
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
        window.location.replace('userinterventions.html')
    })
}

CreateIntervention();
function CreateIntervention(){
    var post_intervention = {
        incident_type: document.getElementById("incident_type").value,
        location: document.getElementById("location").value,
        status: document.getElementById("status").value,
        image: document.getElementById("image").value,
        comment: document.getElementById("comment").value
    }
    fetch(`http://127.0.0.1:5000/api/v1/interventions`,{
        method: 'POST',
        body: JSON.stringify(post_intervention),
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

deleteIntervention();
function deleteIntervention(){
    intervention_id = document.getElementById("intervention_id").value
    let delURL = `http://127.0.0.1:5000/api/v1/interventions/${intervention_id}`;
    console.log(delURL)
    fetch(delURL, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.status === 200){
            // document.getElementById('msg').innerHTML = `${response.message}`
        }
        window.location.replace('userprofile.html')
    })
}