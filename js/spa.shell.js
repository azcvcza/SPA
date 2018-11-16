spa.shell = (function () {
    var configMap = {
        main_html: "" + "<div class='spa-shell-head'>"
            + "<div class='spa-shell-head-logo'></div>"
            + "<div class='spa-shell-head-acct'></div>"
            + "<div class='spa-shell-search'></div>"
            + "</div>"
            + "<div class='spa-shell-main'>"
            + "<div class='spa-shell-main-nav'></div>"
            + "<div class='spa-shell-main-content'></div>"
            + "</div>"
            + "<div class='spa-shell-foot'></div>"
            + "<div class='spa-shell-chat'></div>"
            + "<div class='spa-shell-modal'></div>",
    };//end configMap
    var stateMap = {$container:null};
    var jqueryMap = {};
    var setJqueryMap;
    var initModule;
    //end variable
    
    setJqueryMap = function(){
        var $container = stateMap.$container;
        jqueryMap = {$container:$container};
    }

    initModule = function($container){
        console.log($container);
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
    }
    return {initModule:initModule};
})();