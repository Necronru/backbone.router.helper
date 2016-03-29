# Backbone.RouterHelper

## Examples

```javascript
	var ProductsRouter = Backbone.Router.extend({
		'products' : 'products',	
		'product/(:id)' : 'product',

		products: function(id) {},
		product: function(id) {}
	});

	var Product = Backbone.Model.extend({});

	var product = new Product({id: 1});	
	
	var router = new ProductsRouter();	
	
	console.log(router.generate('product', this.model.toJSON(), { trigger: true })); // product/1

	console.log(router.generate('products', null, { trigger: true })); // products

	router.navigateTo('product', this.model.toJSON(), { trigger: true }); // navigate to product/1
```

## Defaults
```javascript
	Backbone.RouterHelper.prototype.replacePattern = '<%= $2 %>';
```

## TODO

- Tests
- npm run build
