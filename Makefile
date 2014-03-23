jshint:
	@./node_modules/jshint/bin/jshint index.js test

test: jshint
	@./node_modules/.bin/mocha --reporter dot --ui bdd

.PHONY: jshint test