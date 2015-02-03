# pgsql-write-builders

Generates INSERT and UPDATE SQL statements for Postgres from JS objects and arrays

[![NPM](https://nodei.co/npm/pgsql-write-builders.png)](https://nodei.co/npm/pgsql-write-builders/)

[![Build Status](https://travis-ci.org/maxnachlinger/pgsql-write-builders.svg?branch=master)](https://travis-ci.org/maxnachlinger/pgsql-write-builders)

### Installation:
```
npm i pgsql-write-builders
```
### Usage:
```javascript
var pg = require('pg');
var writeSql = require('pgsql-write-builders');
var someConnectionString = "postgres://someuser:@localhost/test";

// INSERT example
pg.connect(someConnectionString, function (err, client, done) {
	if (err) return console.error(err);

	var thingsToInsert = [
		{name: 'Thing 1', color: 'Red'},
		{name: 'Thing 2', color: 'Blue'}
	];

	writeSql.insert({
		tableName: 'test',
		sequenceColumnName: 'id', // adds a RETURNING clause to return new sequence values
		items: thingsToInsert
	}, function (err, insert) {
		if (err) {
			done();
			return console.error(err);
		}

		client.query(insert.sql, insert.values, function (err, result) {
			done();
			if(err) return console.error(err);

			cb(err, result);
		});
	});
});

```
