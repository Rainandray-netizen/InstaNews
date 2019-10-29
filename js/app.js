//https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=TrCrwocaRjaBrbFZ6mGpchM9exLSH5Qs
//https://api.nytimes.com/svc/topstories/v2/science.json?api-key=yourkey

$(function(){
    $("select").on("change", function(event){
        if($(this).val()!=="NULL"){
            $(".articlegrid").html(`
                <div class="loading">
                    <img src="images/ajax-loader.gif" alt="loading..."/>
                </div>`)
            $(".loading").removeClass("hidden")
            $("header").removeClass("headerinit").addClass("minidisplay")
            $section = ($(this).val())
            $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=TrCrwocaRjaBrbFZ6mGpchM9exLSH5Qs`)
            .done(function(data){
                $(".loading").addClass("hidden")
                $title = $(data.results)
                let counter = 0
                $.each($title, function(index,value){
                    if($title[index].multimedia.length !==0 && counter<12){
                        counter++
                        $(".articlegrid").append(
                            `<div class="article" style="background:url('${$title[index].multimedia[4].url}'); background-size:cover;background-repeat: no-repeat;background-position: center center;">
                                <div class="shadowbox">
                                    <a target="_blank" href="${$title[index].url}" class="title">${$title[index].abstract}</a>
                                </div>
                            </div>`)
                    }
                })
            }) 
            .fail(function(){
                alert("Its Knuckles. You're in a comma and I have been trying to get this mesage to you for years..From what doctors discovered in your dreams you believe that I am some sort of game character but i am actually your husband. Please baby, wake up.")
            })
        }
    })
})