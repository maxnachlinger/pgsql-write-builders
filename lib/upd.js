"use strict";

function inputHasErrors(params) {
	params = params || {};

	if (!params.item)
		return new Error('item parameter required');

	if (!params.table)
		return new Error('table parameter required');

	if (!params.where && !params.keyColumn)
		return new Error('Either keyColumn parameter or where parameter is required');

	if (params.keyColumn && !params.item[params.keyColumn])
		return new Error('The keyColumn parameter value [' + params.keyColumn + '] was not found in the item');
}

module.exports = function (params, cb) {
	var inputError = inputHasErrors(params);
	if(inputError)
		return setImmediate(function () { cb(inputError); });

	var keyColumn = params.keyColumn;
	var item = params.item;
	var table = params.table;
	var where = params.where;

	var keys = Object.keys(item);

	var sql = 'UPDATE ' + table + ' SET ';
	var values = [];
	var valueVarCounter = -1;

	// SET col = value clause
	var key = '';
	for (var i = 0; i < keys.length; i++) {
		key = keys[i];
		if (keyColumn && key === keyColumn)
			continue; // PK doesn't get assigned to

		++valueVarCounter;
		if (valueVarCounter > 0)
			sql += ', ';

		sql += key + ' = $' + (valueVarCounter + 1);
		values[valueVarCounter] = item[key];
	}

	// WHERE clause
	sql += ' WHERE ';

	if (!where) {
		++valueVarCounter;
		where = keyColumn + ' = $' + (valueVarCounter + 1);
		values[valueVarCounter] = item[keyColumn];
	}

	sql += where;

	return cb(null, {
		sql: sql + ';',
		values: values
	});
};
