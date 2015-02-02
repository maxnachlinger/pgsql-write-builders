"use strict";

// INSERT INTO tablename (name) VALUES ('Test') RETURNING id
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

	var items = params.items;
	var tableName = params.tableName;
	var sequenceColumnName = params.sequenceColumnName;

	// use the 1st item to get our fields
	var fields = Object.keys(items[0]);

	if (!fields || fields.length === 0) {
		return setImmediate(function () {
			cb(new Error('An item was passed without fields.'));
		});
	}

	var sql = 'INSERT INTO ' + tableName + ' (' + fields.join(', ') + ') VALUES ';

	// VALUES ($1, $2), ($3, $4) ... clause
	var amtItems = items.length;
	var amtFields = fields.length;

	var values = new Array(amtItems * amtFields);

	for (var i = 0, valueVarCounter = 0; i < amtItems; i++) {
		if(i > 0) sql += ', '; // comma before all items except first one
		sql += '(';

		for (var j = 0; j < amtFields; j++, valueVarCounter++) {
			values[valueVarCounter] = items[i][fields[j]];

			if(j > 0) sql += ', '; // comma before all $vars except first one
			sql += '$' + (valueVarCounter + 1);
		}

		sql += ')';
	}

	// RETURNING clause to get new sequence value(s)
	if(sequenceColumnName)
		sql += ' RETURNING ' + sequenceColumnName;

	return cb(null, {
		sql: sql + ';',
		values: values
	});
};
