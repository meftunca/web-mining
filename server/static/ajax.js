/*
$("input").on("keydown",function search(e) {
    if(e.keyCode == 13) {
        alert($(this).val());
    }
});
*/
$(document).ready(function (){

	$("#book-search").on("keyup",function search(e) {
    	if(e.keyCode == 13) {
        	
        	var query_name = $("#book-search").val()
        	$.ajax({

        		url:"find_books",
        		data:{ 'query_name': query_name ,
                        'url': document.url},
        		dataType: "json",
        		beforeSend: function() {
        			console.log("before")
        		},
        		complete: function(data){
        			console.log("completed")
        			
        		},
        		success: function(data){
        			//console.log(data)
        			var bookResult = $("#bookResult");
          			bookResult.empty();
          			if (data.length == 0) {
              			bookResult.html("Sorry, no book found.");
            		}
            		else{
            			
              			data.forEach(function(book) {
                			var li = $("<li>");
                			var img = $("<img>");
                			var link = $("<a>")
                			var name = book.name;
                			var cover = book.cover;
                			var splited = cover.split("/");
                			var id = splited[splited.length-1];
                			link.attr("href", "/book/" + id);
                			img.attr("src",  book.list_img);
                			link.append(img);
                			link.append(name);
                			li.html(book.author);
                			li.prepend(link);          
                			bookResult.append(li);          
              			})
              		
            		}
        		}
        	});
        	
    	}
	});
	
	$("#music-search").on("keyup",function search(e) {
    	if(e.keyCode == 13) {
        	
        	var query_name = $("#music-search").val()
            console.log(query_name)
        	$.ajax({

        		url:"find_musics",
        		data:{ 'query_name': query_name },
        		dataType: "json",
        		beforeSend: function() {
        			console.log("before")
        		},
        		complete: function(data){
        			console.log("completed")
        			
        		},
        		success: function(data){
        			console.log(data)
        			var musicResult = $("#musicResult");
          			musicResult.empty();
          			if (data.length == 0) {
              			musicResult.html("Sorry, no music found.");
            		}
            		else{
            			
              			data.forEach(function(music) {
                			var li = $("<li>");
                			var img = $("<img>");
                			var link = $("<a>")
                			var name = music.name;
                			var cover = music.cover;
                			var splited = cover.split("/");
                			var id = splited[splited.length-1];
                			link.attr("href", "/music/" + id);
                			img.attr("src",  music.list_img);
                			link.append(img);
                			link.append(name);
                			li.html(music.composer);
                			li.prepend(link);          
                			musicResult.append(li);          
              			})
              		
            		}
        		}
        	}); 
        	
    	}
	});

    var counter = 0;
    $("#getReview").click(function(){
        //counter++;
        $.ajax({

            url:"get_comments",
            data: {'id': document.URL.split("/")[4]},
            dataType: "json",
            beforeSend: function() {
                console.log("before")
            },
            complete: function(data){
                console.log("completed")
                
            },
            success: function(data){
                console.log(data)
                /*var comments = $("#comments");
                comments.empty();
                if (data.length == 0) {
                    comments.html("Sorry, no review found.");
                }
                else{
                    
                    data.forEach(function(review) {
                        var li = $("<li>");
                        var img = $("<img>");
                        var link = $("<a>")
                        var name = book.name;
                        var cover = book.cover;
                        var splited = cover.split("/");
                        var id = splited[splited.length-1];
                        link.attr("href", "/book/" + id);
                        img.attr("src",  book.list_img);
                        link.append(img);
                        link.append(name);
                        li.html(book.author);
                        li.prepend(link);          
                        bookResult.append(li);          
                    })
                
                }*/
            }

        });
    });

});