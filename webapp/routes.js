/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes;
var mongodb = require('mongodb'),
    mongoServer = new mongodb.Server('localhost',mongodb.Connection.DEFAULT_PORT),
    dbHandle = new mongodb.Db('spa',mongoServer,{safe:true});
    //console.log(dbHandle);
    dbHandle.open(function(){
      console.log("** connected to db **");
    })
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/spa.html' );
  });

  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.get( '/:obj_type/list', function ( request, response ) {
    //console.log("in get list,dbHandle",dbHandle.collection(request.params.obj_type))
    dbHandle.collection(
      request.params.obj_type,
      function(outer_error,collection){
        collection.find().toArray(
          function(inner_error,map_list){
            response.send(map_list);
          }
        )
      }
    )
  });

  app.post( '/:obj_type/create', function ( request, response ) {
    response.send({ title: request.params.obj_type + ' created' });
  });

  app.get( '/:obj_type/read/:id([0-9]+)',
    function ( request, response ) {
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' found'
      });
    }
  );

  app.post( '/:obj_type/update/:id([0-9]+)',
    function ( request, response ) {
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' updated'
      });
    }
  );

  app.get( '/:obj_type/delete/:id([0-9]+)',
    function ( request, response ) {
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' deleted'
      });
    }
  );
};
module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------
