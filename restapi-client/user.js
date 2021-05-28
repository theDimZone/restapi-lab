const fetchUser = (id) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:80/' + id, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
      
      
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          
            const data = JSON.parse(xhr.responseText);
            $("#email").val(data.email);
            $("#name").val(data.name);
        }
    }
}

const checkId = () => {
    return window.location.href.indexOf("?id") != -1;
}

const getId = () => {
    var url = window.location.href;
    var params = url.split('?')[1].split('=');
    
    return params[1];
}

if(checkId()) {
    fetchUser(getId());
}

const sendUser = () => {
    let method = "";
    let url = 'http://127.0.0.1:80/';

    if(checkId()) {
        method = "PUT";
        url += getId();
    } else {
        method = "POST";
    }

    let name = $("#name").val();
    let email = $("#email").val();

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({ name: name, email: email }));

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
      
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            $(location).attr('href', './index.html')
        }
    }
}