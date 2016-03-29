#!/usr/bin/env node

var assert = require('assert');
var Backbone = require('backbone');
var _ = require('underscore');

require('../backbone.router.helper');

var TestRouter = Backbone.Router.extend({

	routes: {
		'index' : 'index',
		'test(/)(:test)': 'testTest',
		'test/test(/)(:test1)(/)(:test2)': 'testTestTest'
	},

	index: function() {},
	testTest: function(test) {}
});

describe("hasRoute", function() {
	var router = new TestRouter();

	it("существующий роут", function() {
		assert.equal(router.hasRoute('index'), true);
	});

	it("несуществующий роут", function() {
		assert.equal(router.hasRoute('index1'), false);
	});
});

describe('generate', function() {
	var router = new TestRouter();

	it("не параметезированный роут", function() {
		assert.equal(router.generate('index'), 'index');
	});

	it("с одним и более параметрами в роуте", function() {
		assert.equal(router.generate('testTest', {test: 1}), 'test/1');
		assert.equal(router.generate('testTestTest', {test1: 1, test2: 2}), 'test/test/1/2');
	});

	it("с лишними параметрами", function() {
		assert.equal(router.generate('testTest', {test: 1, foo: 'foo', bar: 'bar'}), 'test/1');
	});

	it("с параметром undefined", function() {
		assert.equal(router.generate('testTest', {test: undefined}), 'test/');
	});
});

describe('getRoutes', function() {
	var router = new TestRouter();
	var routes = _.invert( _.clone(router.routes) );

	it("должен вернуть инвертированную копию объекта routes", function() {
		assert.equal(_.isEqual(router.getRoutes(), routes), true);
	});

	it("возвращаемый объект должен быть клоном, а не ссылкой", function() {
		router.routes['index'] = 'index1';
		assert.equal(_.isEqual(router.getRoutes(), routes), false);
	});
});