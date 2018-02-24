$(document).ready(function(){
    /** Remove the Preloader */
    setTimeout(function(){
        $("#loader").fadeOut();
        init();
    }, 2000);
    function init(){
        showActiveSlide();
    }
    /** Initialize Typer with Welcome Text */
    var typer =  new Typed("#typed", {
        strings: ["Loading"],
        typeSpeed: 5,
        loop: false,
        cursorChar: '_'
    });
    var slides = $(".slides");
    function showActiveSlide(){
        if(typer != null){
            typer.destroy();
        }
        var activeSlide = slides.find(".slide.active");
        var eventid = activeSlide.attr("data-slide-id");
        var text = '~<span class="fas fa-dollar-sign"></span> ';
        /** Re-initialize Typer with new details **/
        text += $("#event-details-"+eventid).html();
        typer = new Typed("#typed", {
            strings: [text],
            typeSpeed: 2,
            loop: false,
            cursorChar: '_'
        });
        if(!activeSlide.is(":first-child")){
            $(".eventTitle").addClass("layout-top");
            $("#event-timings").addClass("layout-bottom");
        }else{
            $(".eventTitle").removeClass("layout-top");
            $("#event-timings").removeClass("layout-bottom");
        }
    }
    $(".slide-controller").click(function(e){
        e.preventDefault();
        var target = $(this).attr("data-target");
        var newSlide = slides.find(".slide[data-slide-id="+target+"]");
        $(".slide.prev").removeClass("prev");
        if(newSlide.is(":first-child")){
            slides.find(".slide:last-child").addClass("prev");
        }
        else{
            newSlide.prev(".slide").addClass("prev");
        }
        $(".slide.active").removeClass("active");
        newSlide.addClass("active");
        showActiveSlide();
    });
    /** Next Button */
    $(".control-next").click(function(e){
        e.preventDefault();
        var firstSlide = slides.find(".slide:first-child");
        var nextSlide;
        var currSlide = slides.find(".slide.active");
        var prevSlide = slides.find(".slide.prev");
        prevSlide.removeClass("prev");
        if(currSlide.is(":last-child")){
            nextSlide = firstSlide;
        }else{
            nextSlide = currSlide.next(".slide");
        }
        currSlide.addClass("prev").removeClass("active");
        nextSlide.addClass("active");
        showActiveSlide();
    });
    /** Prev Button */
    $(".control-prev").click(function(e){
        e.preventDefault();
        var lastSlide = slides.find(".slide:last-child");
        var nextSlide;
        var prevSlide = slides.find(".slide.prev");
        var currSlide = slides.find(".slide.active");
        prevSlide.removeClass("prev");
        if(currSlide.is(":first-child")){
            nextSlide = lastSlide;
        }else{
            nextSlide = prevSlide;
        }
        currSlide.removeClass("active");
        nextSlide.addClass("active");
        nextSlide.prev(".slide").addClass("prev");
        showActiveSlide();
    });
});