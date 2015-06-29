QUnit.module("Listener");

QUnit.test( "listent to event and fire it", function( assert ) {
	var count = 0;
	Listener.listenTo('a', function(){
		count++;
	});

	Listener.listenTo('a', function(){
		count++;
	});

	Listener.fireEvent('a');
	assert.equal(count, 2);

	Listener.fireEvent('a');
	assert.equal(count, 4);
});

QUnit.test( "listent to event with namespace and fire it", function( assert ) {
	Listener.listenTo('z.b', function(){
		assert.ok(true, 'event with namespace fired succefully!');
	});

	Listener.listenTo('b', function(){
		assert.ok(false, 'sholud not be fired!');
	});

	Listener.fireEvent('z.b');
});

QUnit.test( "fire event with specific callback", function( assert ) {
	var callback = function(){
		assert.ok(true, 'succefully!');
	};

	Listener.listenTo('d', function(){
		assert.ok(false, 'sholud not be fired!');
	});
	Listener.listenTo('d', callback);
	Listener.fireEvent('d', callback);
});

QUnit.test( "fire event with specific callback and namespace", function( assert ) {
	var count = 0;
	var callback = function(){
		count++;
	};

	Listener.listenTo('z.e', function(){
		assert.ok(false, 'sholud not be fired!');
	});

	Listener.listenTo('e', callback);
	Listener.fireEvent('z.e', callback);
	assert.equal(count, 0);

	Listener.listenTo('z.e', callback);
	Listener.fireEvent('z.e', callback);
	assert.equal(count, 1);
});

QUnit.test( "fire all event with specific name", function( assert ) {
	Listener.listenTo('c', function(){
		assert.ok(true, 'event without namespace fired succefully!');
	});
	Listener.listenTo('a.c', function(){
		assert.ok(true, 'event with namespace fired succefully!');
	});

	Listener.fireEvent('c');
});

QUnit.test( "remove specific event", function( assert ) {
	var count = 0, 
		callback = function(){
			count++;
		};

	Listener.listenTo('f', function(){
		count++;
	});
	Listener.listenTo('ns.f', function(){
		count++;
	});
	Listener.listenTo('f', callback);

	Listener.fireEvent('f');
	assert.equal(count, 3);

	Listener.removeEvent('ns.f');
	Listener.fireEvent('f');
	assert.equal(count, 5);

	Listener.removeEvent('f', callback);
	Listener.fireEvent('f');
	assert.equal(count, 6);
});

QUnit.test( "remove all event", function( assert ) {
	var count = 0, 
		callback = function(){
			count++;
		};

	Listener.listenTo('g', function(){
		count++;
	});
	Listener.listenTo('ns.g', function(){
		count++;
	});
	Listener.listenTo('g', callback);

	Listener.fireEvent('g');
	assert.equal(count, 3);

	Listener.removeEvent('g');
	Listener.fireEvent('g');
	assert.equal(count, 3);
});