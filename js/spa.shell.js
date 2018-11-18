spa.shell = (function () {
    var configMap = {
        anchor_schema_map: {
            chat: {
                open: true,
                closed: true
            }
        },
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
        chat_extend_time: 1000,
        chat_retract_time: 300,
        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_title: "click to init",
        chat_retract_title: "click to extend",

    };//end configMap
    var stateMap = {
        $container: null,
        is_chat_retracted: true,
        anchor_map:{},
    };
    var jqueryMap = {};
    var setJqueryMap;
    var initModule;
    var toggleChat;
    var onClickChat;

    var copyAnchorMap;
    var changeAnchorPart;
    var onHashChange;
    //end variable

    copyAnchorMap = function(){
        return $.extend(true,{},stateMap.anchor_map);
    }//end copyAnchorMap

     
    changeAnchorPart =function(arg_map){
        var anchor_map_revise = copyAnchorMap();
        var bool_return = true;
        var key_name;
        var key_name_dep;

        for(key_name in arg_map){
            if(arg_map.hasOwnProperty(key_name)){
                if(key_name.indexOf('_') === 0){continue}

                anchor_map_revise[key_name] = arg_map[key_name];

                key_name_dep = '_' +key_name;
                if(arg_map[key_name_dep]){
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                }
                else{
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise["_s"+key_name_dep];
                }
            }
        }
        try{
            $.uriAnchor.setAnchor(anchor_map_revise)
        }catch(error){
            $.uriAnchor.setAnchor(anchor_map_revise);
            bool_return = false;
        }
        return bool_return;
    }//end changeAnchorPart

    onHashChange = function(event){
        var anchor_map_previous = copyAnchorMap();
        var anchor_map_proposed;
        var _s_chat_previous;
        var _s_chat_proposed;
        var s_chat_proposed;

        try{
            anchor_map_previous = $.uriAnchor.makeAnchorMap();
        }catch(error){
            $.uriAnchor.setAnchor(anchor_map_previous,null,true);
            return false;
        }
        stateMap.anchor_map = anchor_map_proposed;

        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;

        if(!anchor_map_previous || _s_chat_previous !==_s_chat_proposed){
            s_chat_proposed = anchor_map_proposed.chat;
            switch(s_chat_proposed){
                case 'open':
                    toggleChat(true);
                    break;
                case 'closed':
                    toggleChat(false);
                    break;
                default:
                    toggleChat(false);
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor(anchor_map_proposed,null,true);
            }
        }
        return false;
    }//end onHashChange
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat: $container.find(".spa-shell-chat")
        };
    }//end setJqueryMap

    toggleChat = function (do_extend, callback) {
        console.log("toggleChat", do_extend, callback)
        var px_chat_height = jqueryMap.$chat.height();
        var is_open = px_chat_height === configMap.chat_extend_height;
        var is_closed = px_chat_height === configMap.chat_retract_height;
        var is_sliding = !is_open && !is_closed;

        if (is_sliding) { return false; }

        if (do_extend) {
            jqueryMap.$chat.animate(
                {
                    height: configMap.chat_extend_height
                },
                configMap.chat_extend_time,
                function () {
                    jqueryMap.$chat.attr('title', configMap.chat_extend_title)
                    stateMap.is_chat_retracted = false;
                    if (callback) { callback(jqueryMap.$chat) }
                }
            )
            return true;
        }

        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function () {
                jqueryMap.$chat.attr('title', configMap.chat_retract_title)
                stateMap.is_chat_retracted = true;
                if (callback) { callback(jqueryMap.$chat) }
            }
        )
        return true;

    }//end toogleChat

    onClickChat = function (e) {
        toggleChat(stateMap.is_chat_retracted);
        changeAnchorPart({
            chat:(stateMap.is_chat_retracted?'open':'closed')
        })
        return false;
    }//end onclickchat
    initModule = function ($container) {
        //console.log($container);
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat.attr('title', configMap.chat_retract_title).click(onClickChat)
        setTimeout(function () { toggleChat(true) }, 3000);
        setTimeout(function () { toggleChat(false) }, 8000);
        $.uriAnchor.configModule({
            schema_map:configMap.anchor_schema_map
        });
        $(window).bind("hashChange",onHashChange).trigger("hashchange");
    }//end initModule
    return { initModule: initModule };
})();