"use strict";
var test = require('tape');
var upd = require('../lib/upd');

test('Constructs a simple update using where', function (t) {
	var item = {name: 'Test', color: 'Blue'};
	var expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = 1;';
	var expectedValues = ['Test', 'Blue'];
	
	upd({
		item: item,
		where: 'id = 1',
		table: 'test'
	}, function(err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple update using keyColumn', function (t) {
	var item = {name: 'Test', color: 'Blue', id: 1};
	var expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = $3;';
	var expectedValues = ['Test', 'Blue', 1];

	upd({
		item: item,
		table: 'test',
		keyColumn: 'id'
	}, function(err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});
