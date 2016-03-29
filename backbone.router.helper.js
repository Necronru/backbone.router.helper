(function(factory) {

  // Set up RouterHelper appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone', 'exports'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'), exports);

  // Finally, as a browser global.
  else
    factory(_, Backbone, {});

})(function (_, Backbone, RouterHelper) {

  Backbone.RouterHelper = RouterHelper;

  _(RouterHelper).extend({
    replacePattern: '<%= $2 %>',
    VERSION: '0.1.0',

    template: function(route, pattern) {
      pattern = pattern || RouterHelper.replacePattern;

      tpl = route.replace(/\((\:)(\w+)\)/ig, pattern);
      tpl = tpl.replace(/\(\/\)/ig, '/');

      return _.template(tpl);
    }

  });

  _(Backbone.Router.prototype).extend({

    generate: function(name, parameters, pattern) {
      parameters = _.extend({}, parameters);

      if ( ! this.hasRoute(name) ) {
        throw new Error('route name '+name+' not found in current router');
      }

      var route = this.getRoutes()[name];
      return RouterHelper.template(route, pattern)(parameters);
    },

    navigateTo: function(name, parameters, options, pattern) {
      return this.navigate( this.generate(name, parameters, pattern), options );
    },

    hasRoute: function(name) {
      return _.has( this.getRoutes(), name);
    },

    getRoutes: function() {
      return _.invert( _.clone(this.routes) );
    }

  });
});