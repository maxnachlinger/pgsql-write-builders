"use strict";

// INSERT INTO tablename (id, name) VALUES (1, 'Test')
module.exports = function (params, cb) {
	params = params || {};
	if (!params.items || params.items.length === 0) {
		return setImmediate(function () {
			cb(new Error('params.items required'));
		});
	}
	if (!params.tableName) {
		return setImmediate(function () {
			cb(new Error('params.tableName required'));
		});
	}

	// use the 1st item to get our fields
	var fields = Object.keys(params.items[0]);

	if (!fields || fields.length === 0) {
		return setImmediate(function () {
			cb(new Error('An item was passed without fields.'));
		});
	}

	var sql = 'INSERT INTO ' + params.tableName + ' (' + fields.join(', ') + ') VALUES ';

	// create VALUES ($1, $2), ($3, $4) ... clause
	var amtItems = params.items.length;
	var amtFields = fields.length;

	var values = new Array(amtItems * amtFields);

	for (var i = 0, valueVarCounter = 0; i < amtItems; i++) {
		if(i > 0) sql += ', '; // comma before all items except first one
		sql += '(';

		for (var j = 0; j < amtFields; j++, valueVarCounter++) {
			values[valueVarCounter] = params.items[i][fields[j]];

			if(j > 0) sql += ', '; // comma before all $vars except first one
			sql += '$' + (valueVarCounter + 1);
		}

		sql += ')';
	}

	return cb(null, {
		sql: sql,
		values: values
	});
};
