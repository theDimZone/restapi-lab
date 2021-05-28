const appendUser = (user) => {
    var $newuser= $("<div class='user' id='" + user.id + "'></div>");
    $newuser.append("<h3>" + user.name + "</h3>");
    $newuser.append("<p>" + user.email + "</p>");
    $newuser.append("<a href='./user.html?id=" + user.id + "'>Edit</a> ");
    $newuser.append("<button onclick='deleteUser(" + user.id + ")'>Delete</button>");

    $("#users").append($newuser);
}

const deleteUser = (id) => {
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', 'http://127.0.0.1:80/' + id, true);
    xhr.send();

    xhr.onreadystatechange = () => { 
        if (xhr.readyState != 4) return;
      
      
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
            $('#' + id).remove();
        }
    }
}

const fetchUsers = () => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:80/', true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
      
      
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          
            const data = JSON.parse(xhr.responseText);

            for(let user of data) {
                appendUser(user);
            }
        }
    }
}