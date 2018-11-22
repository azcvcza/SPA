spa.util_b = (function(){
    'use strict';
    var configMap = {
        regex_encode_html:/[&"'><]/g,
        regex_encode_noamp:/["'><]/g,
        html_encode_map:{
            '&':"&#38;",
            '"':"&#34;",
            "'":'&#39;',
            ">":'&#62;',
            "<":"&#60;",
        }
    };//end configMAp

    var decodeHtml,encodeHtml,getEmSize;

    configMap.encode_noamp_map = $.extend({},configMap.html_encode_map);

    delete configMap.encode_noamp_map['&'];
    //end module variable
    //-----begin decodehtml-----//
    decodeHtml = function(str){
        return $('<div/>').html(str||'').text();
    }
    //-----end decode ----------//
    //-----begin encodehtml-----//
    encodeHtml = function(input_arg_atr,exclude_amp){
        var input_str = String(input_arg_atr);
        var regex,lookup_map;
        if(exclude_amp){
            lookup_map = configMap.encode_noamp_map;
            regex = configMap.regex_encode_noamp;
        }
        else{
            lookup_map = configMap.html_encode_map;
            regex = configMap.regex_encode_html;
        }
        return input_str.replace(regex,function(match,name){
            return lookup_map[match] || "";
        })
    }
    //---end encodeHtml -------//
    //-----begin getemsize ----//
    getEmSize = function(elem){
        return Number(getComputedStyle(elem,'').fontSize.match(/\d*\.?\d*/)[0])
    }
    //----- end getemsize ----//

    return {
        decodeHtml:decodeHtml,
        encodeHtml:encodeHtml,
        getEmSize:getEmSize
    }


})()