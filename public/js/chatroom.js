function setcookie(name,value,exday){
    var date= new Date();
    date.setTime(date.getTime()+ exday*24*60*60000);
    var exp="expires="+ date.toGMTString() ;
    document.cookie= name + "=" +value + ";" +exp +";path=/";
}

function getcookie(name){
    var nmae =+ "=";
    var decodecookie = decodeURIComponent(document.cookie);
    var x= decodecookie.split(";");
    var i;
    var xx;
    for(i=0;i<x.length;i++){
xx= x[i];
while(xx.charAt(0)==' '){
    xx= xx.substring(1);

}
if(xx.indexOf(name)==0){
    return xx.substring(name.length+1);
}
    }
    return " ";
}
var cki =window.location.href;
for(var i=0;i<cki.length;i++){
  var ch=cki.charAt(i-1);
  if(ch=='='){break;}
}
var c=cki.substring(i)
document.getElementById('Title').innerHTML="chatroom | "+c;


            function refresh(){
           var i;
           var myvar;
           var hervar;                        
           myvar= document.getElementsByClassName('me');
           hervar= document.getElementsByClassName('client');
                
                fetch("/api/users/refresh", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      sender: getcookie("login"),
                        receiver: c
                    }),
                  }).then(response =>{
                
                   
                    return response.json();
                  }).then(user =>{
                   ar=user.messages
                   ss=user.sw
                   
                   var j;
                   if(ar.length>26){
                       j=ar.length-26;
                   }else{j=0;}
           if (ar.length<26){k=ar.length;}else{k=26;}
           
                   for(i=0;i<k;i++){
                       if(ss[j]==true){
                           myvar[i].innerHTML= ar[j];
                           hervar[i].innerHTML="";
                        
                       }else{
                           hervar[i].innerHTML= ar[j];
                           myvar[i].innerHTML="";}
                       j++;
                       }


                  }).catch(err=>{}); 
              
 
       }

   
    document.getElementById('wel').innerHTML = c;
    document.getElementById('wel').href= "/users/user?nameuser=" + c




function exit(){
    check=false;
    setcookie("login", " ", -1);
    window.location.assign("/users/login");
  
  }

  function gohome(){
    window.location.assign("/users/contacts");
  }
        

            function send(){
             var message;
             message = document.getElementById('mas').value;
             var sender= getcookie("login");
             var cki =window.location.href;
            for(var i=0;i<cki.length;i++){
             var ch=cki.charAt(i-1);
             if(ch=='='){break;}
              }
             var c=cki.substring(i)
             var receiver=c;
             fetch("/api/users/chatroom", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: message,
                    sender: sender,
                    receiver:receiver
                }),
              }).then((res) => {console.log(res)});           
document.getElementById('mas').value=""; 

}

var check=true;
var mycheck = getcookie("login");
if (mycheck == " ") {
  window.location.assign("/users/login");
  check =false;
}
if(check)
{ setInterval(refresh,500);}


