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
                        $("#bookTable").empty();
              			$("#bookTable").html("Sorry, no book found.");
            		}
            		else{
            			
              			data.forEach(function(book) {
                            var img = $("<img>");
                			var name = book.name;
                			var cover = book.cover;
                			var splited = cover.split("/");
                			var id = splited[splited.length-1];
                            img.attr("src",  book.list_img);
                            
                            var tr = $("<tr>");
                            for(i=0;i<3;i++){
                                var td = $("<td>");
                                var link = $("<a>")
                                link.attr("href", "/book/" + id);
                                if(i==0){
                                    link.append(img);
                                    td.append(link)
                                }
                                if(i==1){
                                    link.html(name)
                                    td.append(link)
                                }
                                if(i==2){
                                    td.html(book.author)
                                }
                                tr.append(td);
                                
                            }
                			//tr.prepend(link);      
                			bookResult.append(tr);          
              			})
              		
            		}
        		}
        	});
        	
    	}
	});//end of book-search
	
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
                        $("#musicTable").empty();
              			$("#musicTable").html("Sorry, no music found.");
            		}
            		else{
            			
              			data.forEach(function(music) {
                            var img = $("<img>");
                            var name = music.name;
                            var cover = music.cover;
                            var splited = cover.split("/");
                            var id = splited[splited.length-1];
                            img.attr("src",  music.list_img);
                            
                            var tr = $("<tr>");
                            for(i=0;i<3;i++){
                                var td = $("<td>");
                                var link = $("<a>")
                                link.attr("href", "/music/" + id);
                                if(i==0){
                                    link.append(img);
                                    td.append(link)
                                }
                                if(i==1){
                                    link.html(name)
                                    td.append(link)
                                }
                                if(i==2){
                                    td.html(music.composer)
                                }
                                tr.append(td);
                                
                            }
                            //tr.prepend(link);      
                            musicResult.append(tr);           
              			})
              		
            		}
        		}
        	}); 
        	
    	}
	});//end of music-search

    var counter = 0;
    $("#getReview").click(function(){
        
        counter++;

        $("#getReview").val("More Reviews")
        var id = document.URL.split("/")[4]
        $.ajax({

            url:"/get_comments",
            data: {'id': id,
                    'counter': counter },
            dataType: "json",
            beforeSend: function() {
                console.log("before")
            },
            complete: function(){
                console.log("completed")
                
            },
            success: function(data){
                console.log(data)
                var comments = $("#comments");
                comments.empty();
                if (data.length == 0) {
                    comments.html("Sorry, no review found.");
                }
                else{
                    var head = $("<h4>");
                    head.html("Reviews")
                    head.append($("<hr>"))
                    comments.append(head)
                    data.forEach(function(review) {
                        var li = $("<li>");
                        li.html(review);
         
                        comments.append(li);          
                    })
                
                }
            }

        });

        
    });//end of getReview click function
    
});