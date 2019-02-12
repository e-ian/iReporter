getRedflags();
function getRedflags() {
    let regflagsUrl = "http://127.0.0.1:5000/api/v1/redflags";
    token = localStorage.getItem('access_token')
    console.log(token)
    fetch(regflagsUrl, {
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
            document.getElementById('Redflags').innerHTML = output;
        });

}

// getting a specific redflag by id
document.getElementById('getSpecific').onclick = function getSpecificredflag(){
    let redflag_id = document.getElementById('incidentSearch').value;
    console.log(redflag_id)
    let specRedflagsURL = `http://127.0.0.1:5000/api/v1/redflags/${redflag_id}`;
    console.log(specRedflagsURL)
    token = localStorage.getItem('access_token')
    fetch(specRedflagsURL, {
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
                    <input type="text" id="status" placeholder="input status" class="login-input">
                    <button type="submit" class="btn">submit</button>
                    </form>
                </div>`;
                console.log(output);         
            
            document.getElementById('popUp').innerHTML = output;
            document.getElementById('popUp').style.display = 'block';
        }
    })
}