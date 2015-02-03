"use strict";

function inputHasErrors(params) {
	params = params || {};

	if (!params.table)
		return new Error('table parameter required');

	if (!params.where && !params.keyColumn)
		return new Error('Either the keyColumn or where parameter is required');

	if (params.keyColumn && !params.keyValue)
		return new Error('The keyValue parameter is required when the keyColumn parameter is passed');
}

module.exports = function (params, cb) {
	var inputError = inputHasErrors(params);
	if (inputError)
		return setImmediate(function () { cb(inputError); });

	var table = params.table;
	var where = params.where;
	var keyColumn = params.keyColumn;
	var keyValue = params.keyValue;

	var values = [];
	var sql = 'DELETE FROM ' + table + ' WHERE ';

	if (!where) {
		where = keyColumn + ' = $1';
		values[0] = keyValue;
	}

	sql += where;

	return cb(null, {
		sql: sql + ';',
		values: values
	});
};
