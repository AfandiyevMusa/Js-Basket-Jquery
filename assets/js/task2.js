$(function () {

    $(document).on("click", ".right", function(){
        let activeImage = $(".active-img")
        activeImage.removeClass("active-img");
        if(activeImage.next().length != 0){
            activeImage.next().addClass("active-img")
        }else{
            $(".img :first-child").addClass("active-img")
        }
    })
    
    $(document).on("click", ".left", function(){
        let activeImage = $(".active-img")
        activeImage.removeClass("active-img");
        if(activeImage.prev().length != 0){
            activeImage.prev().addClass("active-img")
        }else{
            $(".img :last-child").addClass("active-img")
        }
    })

    var dots = $(".slider .dots i")
    $(document).on("click", dots, function(){
        console.log("hello");
        eachImage = $(".img img");
        // let elem = eachImage.find(m=>m.id = elem.attr("data-id"))
        if($(this).attr("data-id") == eachImage.attr("data-id")){
            eachImage.addClass("active-img")
            // console.log("hi");
        }else{
            // console.log("bye");
            eachImage.removeClass("active-img")
        }
    })
});