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

function insertExample(cb) {
    pg.connect(someConnectionString, function (err, client, done) {
        if (err) return cb(err);

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
                return cb(err);
            }

            /*
            insert.sql: INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING id;
            insert.values: ['Thing 1', 'Red', 'Thing 2', 'Blue']
            */
            client.query(insert.sql, insert.values, function (err, result) {
                done();
                cb(err, result);
            });
        });
    });
}

function updateExample(cb) {
    pg.connect(someConnectionString, function (err, client, done) {
        if (err) return cb(err);

        var thingToUpdate = {id: 1, name: 'Thing 1 (edited)', color: 'Green'};

        writeSql.update({
            tableName: 'test',
            keyColumnName: 'id',
            item: thingToUpdate
        }, function (err, update) {
            if (err) {
                done();
                return cb(err);
            }

            /*
            update.sql: UPDATE test SET name = $1, color = $2 WHERE id = $3;
            update.values: ['Thing 1 (edited)', 'Green', 1]
            */
            client.query(update.sql, update.values, function (err, result) {
                done();
                cb(err, result);
            });
        });
    });
}
```
