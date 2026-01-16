const memberURL = 'data/members.json';

async function getMember(){
 
try{
    const response = await fetch(memberURL);
    if(!response.ok){
        throw Error ("Loadaing member data JSON failed");    
    }
    const data = await response.json();
    console.log("Members loaded:",data.members);
}catch (error){
    console.log("Error:", error);
}


} 

getMember();