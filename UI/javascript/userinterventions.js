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