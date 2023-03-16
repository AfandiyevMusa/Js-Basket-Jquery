$(function () {

    $(".open").click(function(){
        $(".sidebar").removeClass("hide")
        $(".open").addClass("d-none")
        $(".close").removeClass("d-none")
        $(".sidebar").addClass("active-body")
    })
    
    $(".close").click(function(){
        $(".sidebar").addClass("hide")
        $(".close").addClass("d-none")
        $(".open").removeClass("d-none")
        $(".sidebar").removeClass("active-body")
    })    
});