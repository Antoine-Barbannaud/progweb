<!DOCTYPE html>
<html>
    <head>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script>
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

        </script>
    </head>
    <body>
        <button onclick="hide()" id="btn">cacher</button>
        <div id="myID">
            <div>
                <div>
                    <input type="text" size="55" class="1" value="Yes" readOnly="">
                    <button onclick="modifyOption(this.parentNode)">suppr</button>
                </div>
                <div>
                    <input type="text" size="55" class="1" value="No" readOnly="">
                    <button onclick="removeOption(this.parentNode)">suppr</button>
                </div>
                <div>
                    <input type="text" size="55" class="1" value="Abstention" readOnly="">
                    <button onclick="removeOption(this.parentNode)">suppr</button>
                </div>
                <div>
                    <input type="text" size="55" class="1" value="" readOnly="">
                    <button onclick="addOption(this.parentNode)">add</button>
                </div>
            </div> 
            <button onclick="validate()">Submit</button>
            
        </div>
        
            
    </body>

</html>