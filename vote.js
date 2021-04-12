var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var user = sessionStorage.getItem("username");

console.log(user);

window.onload = function () {
	document.getElementById("owner").value = user;
}


function removeOption(Node){
    Node.parentNode.removeChild(Node);
}

 function modifyOption(Node){
    $("button").each(function(){
        $(this).html("add");
    });
    
}

function addOption(Node){
    const div = document.createElement('div');
    div.className = '1';
    div.innerHTML = `
        <input type="text" size="55" class="1" value="">
        <button onclick="removeOption(this.parentNode)">suppr</button>
    `;
    Node.parentNode.appendChild(div);
}

function validate(){
    $("input").each(function(index, value){
        console.log($(value).val());
    });
}

function hide(){ 
    $('#myID').toggle();
}
