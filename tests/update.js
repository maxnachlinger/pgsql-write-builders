"use strict";
var test = require('tape');
var update = require('../lib/update');

test('Constructs a simple update using $where', function (t) {
	var item = {name: 'Test', color: 'Blue', $where: 'id = 1'};
	var expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = 1';
	var expectedValues = ['Test', 'Blue'];
	
	update({
		item: item,
		tableName: 'test'
	}, function(err, res) {
		t.equal(res.sql, expectedSQL, "Returns the expected SQL");
		t.deepEqual(res.values, expectedValues, "Return the expected values");
		t.end();
	});
});

test('Constructs a simple update using keyColumnName', function (t) {
	var item = {name: 'Test', color: 'Blue', id: 1};
	var expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = $3';
	var expectedValues = ['Test', 'Blue', 1];

	update({
		item: item,
		tableName: 'test',
		keyColumnName: 'id'
	}, function(err, res) {
		t.equal(res.sql, expectedSQL, "Returns the expected SQL");
		t.deepEqual(res.values, expectedValues, "Return the expected values");
		t.end();
	});
});
