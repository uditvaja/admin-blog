$(document).ready(function(){
    $(".s11").click(function(){
        $(".down").slideToggle(300);
        $(this).find("#this1").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});
$(document).ready(function(){
    $(".s12").click(function(){
        $(".down2").slideToggle(300);
        $(this).find("#this2").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});
$(document).ready(function(){
    $(".s13").click(function(){
        $(".down3").slideToggle(300);
        $(this).find("#this3").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});


$(document).ready(function(){
    $(".s14").click(function(){
        $(".down4").slideToggle(300);
        $(this).find("#this4").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});



$(document).ready(function(){
    $(".s15").click(function(){
        $(".down5").slideToggle(300);
        $(this).find("#this5").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});


$(document).ready(function(){
    $(".s16").click(function(){
        $(".down6").slideToggle(300);
        $(this).find("#this6").toggleClass("ri-arrow-right-s-line , ri-arrow-down-s-line")
    });
});



$(document).ready(function(){
    $("#t2").mouseenter(function(){
        $("#t3").fadeIn(200);
        $(this).find("#t4").toggleClass("ri-arrow-down-s-fill , ri-arrow-up-s-fill ")
    });
    $("#t2").mouseleave(function(){
        $("#t3").fadeOut(200);
        $(this).find("#t4").toggleClass("ri-arrow-down-s-fill , ri-arrow-up-s-fill ")
    });
});

$(document).ready(function(){
    $("#navi1").click(function(){
        $(".side").toggleClass("hide")
        $(".nav").toggleClass("nhide")
        $(".content").toggleClass("chide")
    })
})

$(document).ready(function(){
    $("#sun").click(function(){
        $(".content").toggleClass("bg");
        $(".nav3").find("#sun").toggleClass("ri-sun-line ,   ri-moon-line")
    })
})



      
