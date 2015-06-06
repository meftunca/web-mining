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
                            for(i=0;i<4;i++){
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
                                    td.html(book.gender)
                                }
                                if(i==3){
                                    td.html(book.author)
                                }
                                tr.append(td);
                                
                            }     
                			bookResult.append(tr);          
              			})
              		
            		}
        		}//end of success
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
        		}//end of success
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

    $.ajax({

        url:"/book_score_query",
        dataType: "json",
        beforeSend: function() {
            console.log("before")
        },
        complete: function(){
            console.log("completed")
        },
        success: function(data){
            console.log(data)
            bookdata = []
            data.forEach(function(book){
                var tr = $("<tr>");
                for(i=0;i<2;i++){
                    var td = $("<td>");
                    
                    if(i==0){
                        td.append(book.name)
                    }
                    if(i==1){
                        td.append(book.score)
                    }
                    tr.append(td);    
                }
                $('#table1').append(tr)
            })
            //console.log(bookdata)
        }

    });//end of ajax
    
    $.ajax({

        url:"/genre_query",
        dataType: "json",
        beforeSend: function() {
            console.log("before")
        },
        complete: function(){
            console.log("completed")
        },
        success: function(data){
            console.log(data)
            genredata = []
            genredata[0] = ['Roman', data.roman]
            genredata[1] = ['Tarih', data.tarih]
            genredata[2] = ['Polisiye', data.polisiye]
            genredata[3] = ['Politika', data.politika]
            genredata[4] = ['İnceleme', data.inceleme]
            genredata[5] = ['Deneme', data.deneme]
            genredata[6] = ['Türk Edebiyatı', data.trkEdebiyat]
            genredata[7] = ['Dünya Klasikleri', data.dnyKlasikler]
            genredata[8] = ['Dünya Edebiyatı', data.dnyEdebiyat]
            $('#chart1').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Genre'
                },
                tooltip: {
                    pointFormat: '{point.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: genredata
                    
                }]
            });    
        }

    });//end of ajax (genre_query)


    var opt;
    scoreList = []
    nameList = []
    $("#selectGenre").change(function(){
        console.log($("#selectGenre").val())
        opt = $("#selectGenre").val();
        
        /*$.ajax({

            url:"/genre_score_query",
            data:{ 'opt': opt },
            datatype:"json",
            beforeSend: function() {
            console.log("before")
            },
            complete: function(){
                console.log("completed")
            },
            success: function(data){
                console.log(data)//data string seklinde geliyor!!!!

                $('#chart2').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: opt,
                    },
                    xAxis: {
                        categories: nameList,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        max:10,
                        title: {
                            text: 'Score'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Score',
                        data: scoreList

                    }]
                });
                
            }//end of success
        });*/
    })
    $("#selectGenre").trigger("change");

    $("#selectGenre").change(function(){
        scoreList = []//grafiğin içini boşaltma
        nameList = []//grafiğin içini boşaltma
        $.ajax({

            url:"/genre_score_query",
            data:{'opt':opt},
            dataType: "json",
            beforeSend: function() {
                console.log("before")
            },
            complete: function(){
                console.log("completed")
            },
            success: function(data){
                console.log(data)
                for(i=0;i<data.length;i++){
                    scoreList.push(parseFloat(data[i]['score']))
                    nameList.push(data[i]['name'])
                }
                console.log(scoreList)
                $('#chart2').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: opt,
                    },
                    xAxis: {
                        categories: nameList,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        max:10,
                        title: {
                            text: 'Score'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Score',
                        data: scoreList

                    }]
                });
            }
        })
    })
});