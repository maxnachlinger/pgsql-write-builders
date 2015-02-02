"use strict";
var test = require('tape');
var insert = require('../lib/insert');

test('Constructs a simple insert', function (t) {
	var items = [
		{id: 1, name: 'Test 1', color: 'Blue'}
	];
	var expectedValues = [1, 'Test 1', 'Blue'];
	var expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3)';

	insert({
		items: items,
		tableName: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple bulk insert', function (t) {
	var items = [
		{id: 1, name: 'Test 1', color: 'Blue'},
		{id: 2, name: 'Test 2', color: 'Red'}
	];
	var expectedValues = [1, 'Test 1', 'Blue', 2, 'Test 2', 'Red'];
	var expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3), ($4, $5, $6)';

	insert({
		items: items,
		tableName: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});
