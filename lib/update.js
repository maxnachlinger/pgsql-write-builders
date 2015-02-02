"use strict";

module.exports = function (params, cb) {
	params = params || {};
	if (!params.item) {
		return setImmediate(function () {
			cb(new Error('params.item required'));
		});
	}
	if (!params.tableName) {
		return setImmediate(function () {
			cb(new Error('params.tableName required'));
		});
	}
	if (!params.item.$where && !params.keyColumnName) {
		return setImmediate(function () {
			cb(new Error('Either params.keyColumnName or params.item.$where is required'));
		});
	}
	if (params.keyColumnName && !params.item[params.keyColumnName]) {
		return setImmediate(function () {
			cb(new Error('params.keyColumnName [' + params.keyColumnName + '] was not found in the params.item'));
		});
	}

	var keys = Object.keys(params.item);

	var sql = 'UPDATE ' + params.tableName + ' SET ';
	var values = [];
	var valueVarCounter = -1;

	// SET col = value clause
	var key = '';
	for (var i = 0; i < keys.length; i++) {
		key = keys[i];
		if (key.charAt(0) === '$')
			continue; // ignore $ prefixed fields like $where etc
		if (params.keyColumnName && key === params.keyColumnName)
			continue; // PK doesn't get assigned to

		++valueVarCounter;
		if (valueVarCounter > 0)
			sql += ', ';

		sql += key + ' = $' + (valueVarCounter + 1);
		values[valueVarCounter] = params.item[key];
	}

	// WHERE clause
	sql += ' WHERE ';

	if (!params.item.$where) {
		++valueVarCounter;
		sql += params.keyColumnName + ' = $' + (valueVarCounter + 1);
		values[valueVarCounter] = params.item[params.keyColumnName];
	} else {
		sql += params.item.$where;
	}

	return cb(null, {
		sql: sql,
		values: values
	});
};