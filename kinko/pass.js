var storage = sessionStorage;

 function set() {
   var k = document.getElementById("k").value;
   var v = document.getElementById("v").value;
   storage.setItem(k, v);
   show_result();
   }

 function cle() {
   storage.clear();
   show_result();
   }

 function show_result() {
   var result = "";
   for(var i=0; i<storage.length; i++){
     var k = storage.key(i);
     result += k + "：" + storage.getItem(k) + "<br>";
     }
   document.getElementById("show_result").innerHTML = result;
   }
   
   