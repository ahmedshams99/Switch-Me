const server ="http://localhost:5000";
const fetch = require("node-fetch");
const User = require("../models/User");

exports.addPeople = async function (req,res){
    
    console.log(`${server}/api/users`);
    var body = {
        major: "Computer Science and Engineering",
        germanLevel:"None",
        englishLevel:"None",
        email: "habd@gmail.com",
        fullName:"ahmed alaa", 
        password:"habeedkbeer",
        dash: 69,
        ID: 1,
        tutorialNumber:1
    } 
    
    await fetch(`${server}/api/users`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));

//////////////////////////////////////////////////////////////////////////////////
    body = {
        major: "Computer Science and Engineering",
        germanLevel:"None",
        englishLevel:"None",
        email: "habd1@gmail.com",
        fullName:"mohamed omar mantawy", 
        password:"habeedkbeer",
        dash: 69,
        ID: 2,
        tutorialNumber:2
    } 
    
    await fetch(`${server}/api/users`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));


    ///////////////////////////////////////////////////////////////////



    body = {
        major: "Computer Science and Engineering",
        germanLevel:"None",
        englishLevel:"None",
        email: "habd2@gmail.com",
        fullName:"ahmed shams sun", 
        password:"habeedkbeer",
        dash: 69,
        ID: 3,
        tutorialNumber:3
    } 
    
    await fetch(`${server}/api/users`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));



/////////////////////////////////////////////////////



body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd3@gmail.com",
    fullName:"nada ", 
    password:"habeedkbeer",
    dash: 69,
    ID: 4,
    tutorialNumber:4
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));


//////////////////////////////////////////////////////////////////////////////////
body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd4@gmail.com",
    fullName:"mohd", 
    password:"habeedkbeer",
    dash: 69,
    ID: 5,
    tutorialNumber:4
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));

//////////////////////////////////////////////////////


body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd5@gmail.com",
    fullName:"abdelrahman saad", 
    password:"habeedkbeer",
    dash: 69,
    ID: 6,
    tutorialNumber:5
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));



//////////////////////////////////////////////////////////////////////////////////
body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd6@gmail.com",
    fullName:"maisara", 
    password:"habeedkbeer",
    dash: 69,
    ID: 7,
    tutorialNumber:6
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));

//////////////////////////////////////////////////////////////////////////////////

body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd7@gmail.com",
    fullName:"khaled ahmed zozza", 
    password:"habeedkbeer",
    dash: 69,
    ID: 8,
    tutorialNumber:8
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));



//////////////////////////////////////////////////////////////////////

body = {
    major: "Computer Science and Engineering",
    germanLevel:"None",
    englishLevel:"None",
    email: "habd8@gmail.com",
    fullName:"TRG MORO", 
    password:"habeedkbeer",
    dash: 69,
    ID: 9,
    tutorialNumber:3
} 

await fetch(`${server}/api/users`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
}).then(res => {
    if (res.status === 200) {
        error = false;
    }
    return res.json();
}).then(json => {
    console.log(json);
}).catch(err => console.log("Error", err));

   

return res.send("Done")
}



exports.addPosts = async function(req,res){
    const allUser = await User.find();
    var myUser = allUser.filter(a=>a.fullName==="ahmed alaa");
    console.log("ahmed alaa");
    console.log(myUser);
    var body = {
        goToTutorials:[3],
        openForDoubleSwitch:false

    }


    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));



    ////////////////////////////////////////////////////////////////



    myUser = allUser.filter(a=>a.fullName==="ahmed shams sun");
    body = {
        goToTutorials:[2],
        openForDoubleSwitch:false

    }
    console.log("ahmed shams sun");
    console.log(myUser);

    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));


///////////////////////////////////////////////////////////
    myUser = allUser.filter(a=>a.fullName==="TRG MORO");
    body = {
        goToTutorials:[8],
        openForDoubleSwitch:false

    }
    console.log("TRG MORO");
    console.log(myUser);

    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));

    //////////////////////////////////////////////////////

    myUser = allUser.filter(a=>a.fullName==="mohd");
    body = {
        goToTutorials:[3],
        openForDoubleSwitch:false

    }
    console.log("mohd");
    console.log(myUser);

    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));




    myUser = allUser.filter(a=>a.fullName==="abdelrahman saad");
    body = {
        goToTutorials:[3],
        openForDoubleSwitch:false

    }
    console.log("abdelrahman saad");
    console.log(myUser);

    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));



    myUser = allUser.filter(a=>a.fullName==="khaled ahmed zozza");
    body = {
        goToTutorials:[3],
        openForDoubleSwitch:false

    }
    console.log("khaled ahmed zozza");
    console.log(myUser);


    await fetch(`${server}/api/users/createPost/${myUser[0]._id}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));

    return res.send("Done Posts");
}