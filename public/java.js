
var login = {
    checkpass : function(){
        
    }
};

var menua = {
    setActive : function(elem){
       // elem.className = "active";
    }
};

var post = {
    check : function(){
        var posttext = document.getElementById('posttext');
        var postphoto = document.getElementById('postphoto')
        var postvideo = document.getElementById('postvideo');
        var postform = document.getElementById('postform');

        //alert(postform);

        if(posttext.value =="" && postphoto.value == "" && postvideo.value == ""){
            posttext.focus();
        }
        else{
            postform.submit();
        }
    }
};;




(function(){
    //alert('Echec');
})();