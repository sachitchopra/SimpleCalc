            var curr = "";
            var stor = "";
            var oper = "";
            
            
            document.body.addEventListener("click", eventHandler);
            
        function eventHandler (event) {
            if(event.target.nodeName == "BUTTON")
            {
                var buttontext = event.target.innerHTML;
                
                if(!isNaN(parseInt(buttontext)))
                {
                    curr += buttontext;
                    print(curr);
                }
                else if(buttontext == "Clear Screen")
                {
                    clear();
                    curr = "";
                    stor = "";
                    oper = "";
                }
                else if(buttontext == "Delete")
                {
                    if(curr != "")
                    {
                        curr = curr.substring(0,curr.length - 1);
                        print(curr);
                    }
                    else
                    {
                        curr = "Error! No value detected!";
                        print(curr);
                    }
                }
                else if(buttontext == "=")
                {
                    if(stor.length > 0 && curr.length > 0 && oper.length > 0)
                    {
                        var formula;
                        var result;
                        formula = document.getElementById("value").value;
                        clear();
                        checkoper(oper);
                        curr = "";
                        oper = "";
                        stor = stor.toString();
                        result = stor;
                        print(stor);
                        ajaxpost(formula, result);
                    }
                    else if(stor.length > 0 && curr.length == 0 && oper.length == 0)
                    {
                        clear();
                        curr = "";
                        print(stor);
                    }
                    else if (curr.length > 0 && stor.length == 0 && oper.length == 0)
                    {
                        stor = curr;
                        curr = "";
                        print(stor);
                    }
                    else
                    {
                        clear();
                        stor = "Error! Nothing Provided.";
                        print(stor);
                    }
                }
                else 
                {
                    if (curr.length > 0 && stor.length > 0)
                    {
                        checkoper(oper);
                        stor = stor.toString();
                        curr = "";
                        oper = buttontext;
                        print(oper);
                    }
                    else if(curr.length > 0 && stor.length == 0)
                    {
                        stor = curr;
                        curr = "";
                        oper = buttontext;
                        print(oper);
                    }
                    else if(curr.length == 0 && stor.length > 0)
                    {
                        oper = buttontext;
                        print(oper);
                    } 
                    else
                    {
                        stor = "Error. Not Enough Input";
                        print(stor);
                    }
                }
            }
            debug();
        }
        
        // Displays whatever value given
        function print (value) {
            if(oper.length > 0)
            {
                if(curr.length > 0)
                {
                        document.getElementById("value").value += curr.slice(-1);
                }
                else
                {
                        document.getElementById("value").value += value;
                }  
            }
            else
            {
                document.getElementById("value").value = value;
            }
        }
        
        function clear () {
            document.getElementById("value").value = null;
        }
        
        //Check if +/-/x// is used and calculates proper operation
        function checkoper (oper) {
            if(oper == "+")
            {
                stor = parseInt(stor) + parseInt(curr);
            }
            else if(oper == "-")
            {
                stor = parseInt(stor) - parseInt(curr);
            }
            else if(oper == "x")
            {
                stor = parseInt(stor) * parseInt(curr);
            }
            else if(oper == "/")
            {
                stor = Math.round(parseFloat(stor) / parseFloat(curr));
            }
        }
        
        //Prints all three string values (curr, oper, and stor) to console
        function debug () {
            console.log("curr: ", curr);
            console.log("stor: ", stor);
            console.log("oper: ", oper);
        }
        
        function ajaxpost (formula, result) {
                var fopen = new XMLHttpRequest();
                var url = "checkconnection.php";
                var vars = "calculation="+formula+"&result="+result;
                fopen.open("POST",url,true);
                fopen.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                fopen.onreadystatechange = function() {
                        if(fopen.readyState == 4 && fopen.status == 200) {
                                var return_data = fopen.responseText;
                                document.getElementById("history").innerHTML = return_data;
                        }
                };
                fopen.send(vars);
                return;
        }