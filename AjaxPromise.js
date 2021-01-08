let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs:";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log("State changed called, Ready state: "+
                        xhr.readyState+" Status:"+xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to the server");
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: "+responseText);
    })
    .catch(error => console.log("GET Error status: "+JSON.stringify(error)));
console.log("Made GET AJAX Call to Server at "+showTime());

const deleteURL = "http://localhost:3000/employees/3";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: "+responseText);
    })
    .catch(error => console.log("DELETE Error status: "+JSON.stringify(error)));
console.log("Made DELETE AJAX Call to server at "+showTime());

const postURL = "http://localhost:3000/employees";
const empData = {"name": "Harry", "Salary": "5000"};
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added: "+responseText)
    })
    .catch(error => console.log("POST Error status: "+JSON.stringify(error)));
console.log("Made POST AJAX Call to server at "+showTime());