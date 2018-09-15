all:
	./private/elm make ./elm/Main.elm --output ./public/dist/app.js

build.log: ./elm/*
	make all | tee ./build.log

clean:
	rm -rf ./public/dist/
	mkdir -p ./public/dist/
	mkdir -p ./logs/
	touch ./build.log

#serve:
#	./private/elm reactor --port=8080

watch:
	(while true; do make -q build.log || make build.log ; sleep 1; done) | grep -v 'make\[1\]'

.PHONY: all clean
