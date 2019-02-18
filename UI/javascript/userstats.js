let token = localStorage.getItem('access_token')
redflagstats()
function redflagstats(){
    let draft = 0
    let underinvestigation = 0
    let resolved = 0
    let rejected = 0
    
    fetch('http://127.0.0.1:5000/api/v1/redflags',{
        method: 'GET',
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${token}`,
            'mode': 'no-Cors'
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        console.log(res)
        res['redflag_list'].forEach(redflag =>{
            if(redflag.status ==='draft'){
                draft++;
            }
            if(redflag.status ==='under investigation'){
                underinvestigation++;
            }
            if(redflag.status ==='resolved'){
                resolved++;
            }
            if(redflag.status ==='rejected'){
                rejected++;
            }
            document.getElementById('flagstats').innerHTML=`
            <td>${draft}</td>
            <td>${underinvestigation}</td>
            <td>${resolved}</td>
            <td>${rejected}</td>
            `
        })
    })
}

let user_token = localStorage.getItem('access_token')
interventionstats()
function interventionstats(){
    let draft = 0
    let underinvestigation = 0
    let resolved = 0
    let rejected = 0
    
    fetch('http://127.0.0.1:5000/api/v1/interventions',{
        method: 'GET',
        headers: {
            'Content_type': 'application/json',
            'Authorization': `${user_token}`
        }
    })
    .then((response)=>response.json())
    .then((res)=>{
        console.log(res)
        res['interventions_list'].forEach(intervention =>{
            if(intervention.status ==='draft'){
                draft++;
            }
            if(intervention.status ==='under investigation'){
                underinvestigation++;
            }
            if(intervention.status ==='resolved'){
                resolved++;
            }
            if(intervention.status ==='rejected'){
                rejected++;
            }
            document.getElementById('intstats').innerHTML=`
            <td>${draft}</td>
            <td>${underinvestigation}</td>
            <td>${resolved}</td>
            <td>${rejected}</td>
            `
        })
    })
}