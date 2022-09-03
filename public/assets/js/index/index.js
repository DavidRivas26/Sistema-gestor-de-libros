$(document).ready(function(){
  
  $("#delete-authors").on('click',function(e){
    e.preventDefault();   

    if(confirm("Estas seguro que deseas eliminar este autor?")){
        $("#form-delete").submit();
    }

  });

  $("#delete-editorials").on('click',function(e){
    e.preventDefault();   

    if(confirm("Estas seguro que deseas eliminar este editorial?")){
        $("#form-delete").submit();
    }

  });

  $("#delete-categories").on('click',function(e){
    e.preventDefault();   

    if(confirm("Estas seguro que deseas eliminar este categoria?")){
        $("#form-delete").submit();
    }

  });

  $("#delete-books").on('click',function(e){
    e.preventDefault();   

    if(confirm("Estas seguro que deseas eliminar este categoria?")){
        $("#form-delete").submit();
    }

  });
  
});