'use strict';

Backbone.RouterHelper = function() {};

_(Backbone.RouterHelper.prototype).extend({
  replacePattern: '<%= $2 %>',
  VERSION: '0.1.0'
});

(function (Helper) {

  _(Backbone.Router.prototype).extend({

    generate: function(name, parameters, pattern) {
      pattern    = pattern || Helper.prototype.replacePattern;
      parameters = _.extend({}, parameters);

      var routes = _.invert( _.clone(this.routes) );

      if ( ! _.has(routes, name)) {
        console.error('route name %s not found in current router', name);
        return null;
      }

      var tpl = routes[name].replace(/\((\:)(\w+)\)/ig, pattern);
      tpl = tpl.replace(/\(\/\)/ig, '/');

      return _.template(tpl)(parameters);
    },

    navigateTo: function(name, parameters, options, pattern) {
      var url = this.generate(name, parameters, pattern);
      return this.navigate(url, options);
    }

  });
})(Backbone.RouterHelper);