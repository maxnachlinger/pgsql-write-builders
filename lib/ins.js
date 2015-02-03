"use strict";

function inputHasErrors(params) {
	params = params || {};

	if (!params.items || params.items.length === 0)
		return new Error('items parameter required');

	if (!params.table)
		return new Error('table parameter required');
}

module.exports = function (params, cb) {
	var inputError = inputHasErrors(params);
	if(inputError)
		return setImmediate(function () { cb(inputError); });

	var items = params.items;
	var table = params.table;
	var returningAll = params.returningAll;

	// use the 1st item to get our fields
	var fields = Object.keys(items[0]);

	if (!fields || fields.length === 0)
		return setImmediate(function () { cb(new Error('An item was passed without fields.')); });

	var sql = 'INSERT INTO ' + table + ' (' + fields.join(', ') + ') VALUES ';

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

	// RETURNING clause to get newly INSERTed rows
	if(returningAll)
		sql += ' RETURNING *';

	return cb(null, {
		sql: sql + ';',
		values: values
	});
};
