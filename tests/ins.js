"use strict";
var test = require('tape');
var ins = require('../lib/ins');

test('Constructs a simple INSERT', function (t) {
	var items = [
		{id: 1, name: 'Test 1', color: 'Blue'}
	];
	var expectedValues = [1, 'Test 1', 'Blue'];
	var expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3);';

	ins({
		items: items,
		table: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple INSERT with a RETURNING clause', function (t) {
	var items = [
		{name: 'Test 1', color: 'Blue'}
	];
	var expectedValues = ['Test 1', 'Blue'];
	var expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2) RETURNING *;';

	ins({
		items: items,
		returningAll: true,
		table: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple bulk INSERT', function (t) {
	var items = [
		{id: 1, name: 'Test 1', color: 'Blue'},
		{id: 2, name: 'Test 2', color: 'Red'}
	];
	var expectedValues = [1, 'Test 1', 'Blue', 2, 'Test 2', 'Red'];
	var expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3), ($4, $5, $6);';

	ins({
		items: items,
		table: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple bulk INSERT with a RETURNING clause', function (t) {
	var items = [
		{name: 'Test 1', color: 'Blue'},
		{name: 'Test 2', color: 'Red'}
	];
	var expectedValues = ['Test 1', 'Blue', 'Test 2', 'Red'];
	var expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING *;';

	ins({
		items: items,
		returningAll: true,
		table: 'test'
	}, function (err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});
