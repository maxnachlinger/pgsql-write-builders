module.exports.err = function (err, cb) {
	return setImmediate(function () {
		cb(err);
	});
};
