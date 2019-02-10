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
