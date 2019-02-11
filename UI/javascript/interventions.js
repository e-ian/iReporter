getInterventions();
function getInterventions() {
    let interventionsUrl = "http://127.0.0.1:5000/api/v1/interventions";
    token = localStorage.getItem('access_token')
    console.log(token)
    fetch(interventionsUrl, {
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`
        }
    })
    .then(resp => resp.json())
    .then(response => {
        console.log(response)
        let output = `
        <tr class="Admin-table">
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
            document.getElementById('interventions').innerHTML = output;
        });

}

document.getElementById('getSpecific').onclick = function getSpecificIntervention(){
    let intervention_id = document.getElementById('incidentSearch').value;
    console.log(intervention_id)
    let specInterventionsURL = `http://127.0.0.1:5000/api/v1/interventions/${intervention_id}`;
    console.log(specInterventionsURL)
    token = localStorage.getItem('access_token')
    fetch(specInterventionsURL, {
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`
        }
    })
    
    .then(res => res.json())
    .then(response => {
        console.log(response)
        if (response.message === 'Intervention record not found'){
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
                    <button type="submit" class="btn" value="edit">Edit status</button>
                    </form>
                </div>`;
                console.log(output);         
            
            document.getElementById('popUp').innerHTML = output;
            document.getElementById('popUp').style.display = 'block';
        }
    })
}