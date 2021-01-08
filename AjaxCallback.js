let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs:";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State changed called. Ready State: "+
                    xhr.readyState+" Status:"+xhr.status);
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            }else if(xhr.status >= 400){
                console.log("Handle 400 client error or 500 server error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request sent to the server");
}

const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data: "+ showTime() +" Data: "+data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at "+showTime());

const deleteURL = "http://localhost:3000/employees/3";
function userDeleted(data) {
    console.log("User Deleted: "+ showTime() +" Data: "+data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX Call to server at "+showTime());

const postURL = "http://localhost:3000/employees";
const empData = {"name": "Harry", "Salary": "5000"};
function userAdded(data){
    console.log("User Added: "+data);
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made POST AJAX Call to server at "+showTime());