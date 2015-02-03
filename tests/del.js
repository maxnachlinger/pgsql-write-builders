"use strict";
var test = require('tape');
var del = require('../lib/del');

test('Constructs a simple delete using where', function (t) {
	var expectedSQL = 'DELETE FROM test WHERE id = 1;';
	var expectedValues = [];

	del({
		where: 'id = 1',
		table: 'test'
	}, function(err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});

test('Constructs a simple delete using keyColumn', function (t) {
	var expectedSQL = 'DELETE FROM test WHERE id = $1;';
	var expectedValues = [1];

	del({
		table: 'test',
		keyColumn: 'id',
		keyValue: 1
	}, function(err, res) {
		t.notOk(err, "No error should have been returned, received: " + (err && err.stack));
		t.equal(res.sql, expectedSQL, "Returns the expected SQL: " + res.sql);
		t.deepEqual(res.values, expectedValues, "Return the expected values: " + JSON.stringify(res.values));
		t.end();
	});
});
