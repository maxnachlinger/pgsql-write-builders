"use strict";
var utils = require('./utils');

module.exports = function (params, cb) {
	params = params || {};

	if (!params.item)
		return utils.err(new Error('params.item required'), cb);
	if (!params.tableName)
		return utils.err(new Error('params.tableName required'), cb);
	if (!params.where && !params.keyColumnName)
		return utils.err(new Error('Either params.keyColumnName or params.where is required'), cb);
	if (params.keyColumnName && !params.item[params.keyColumnName])
		return utils.err(new Error('params.keyColumnName [' + params.keyColumnName + '] was not found in the params.item'), cb);

	var keys = Object.keys(params.item);

	var sql = 'UPDATE ' + params.tableName + ' SET ';
	var values = [];
	var valueVarCounter = -1;

	// SET col = value clause
	var key = '';
	for (var i = 0; i < keys.length; i++) {
		key = keys[i];
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

	if (!params.where) {
		++valueVarCounter;
		params.where = params.keyColumnName + ' = $' + (valueVarCounter + 1);
		values[valueVarCounter] = params.item[params.keyColumnName];
	}

	sql += params.where;

	return cb(null, {
		sql: sql + ';',
		values: values
	});
};
