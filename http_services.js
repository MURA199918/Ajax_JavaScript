function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            console.log(methodType+" State changed called. Ready state: "+
                        xhr.readyState+" Status:"+xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: XMLHttpRequest.statusText
            });
        };
        xhr.open(methodType, url, async);
        if(data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to the server");
    });
}