js_src_files = *.js
js_test_files = test/*.js

all: jshint test

jshint: $(js_src_files) $(js_test_files)
	@./node_modules/jshint/bin/jshint $^

test: $(js_src_files) $(js_test_files)
	@./node_modules/.bin/mocha --reporter dot --ui bdd

.PHONY: all jshint test