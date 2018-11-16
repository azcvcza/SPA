var spa =(function($){
    var initModule = function(target){
        var container = $(target);
        spa.shell.initModule(container);
        //console.log(target,container)
        //container.html("<h1 style='display:inline-block;margin:25px;text-align:center;'>"+"hello spa"+"</h1>")
        //container.innerHTML = "<h1 style='display:inline-block;margin:25px;>"+"hello spa"+"</h1>";
        //console.log(container,"after")
    }
    return{
        initModule:initModule
    }
})(jQuery);