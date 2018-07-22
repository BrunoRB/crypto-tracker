
# Crypto Tracker

Simple crypto tracker that uses the Moneeda API.

## Running the app

Node.js >= 8.0.0 and NPM or YARN.

First __install de dependencies__ with `yarn install` or `npm install`.

Then to "just run" the app use:

`MONEEDA_TOKEN=[full_token] yarn run dev`

or

`MONEEDA_TOKEN=[full_token] npm run dev`

The app will the available at the `http://localhost:8081` address.

example:

```
brunorb@darkstar:~$ MONEEDA_TOKEN=tokenThatYouShouldProvide yarn run dev

yarn run v1.7.0
$ DEBUG=ct-br:* ./node_modules/.bin/nodemon ./src/main.js
[nodemon] 1.18.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./src/main.js`
Crypto tracker 1.0.0
  ct-br:confs Production confs not found at ./../prod-confs.json +0ms
  ct-br:confs MONEEDA_TOKEN eyJh...PPYE +0ms
http://localhost:8081
```

Alternatively you can create a JSON config file that has the token:

```
brunorb@darkstar:~$ ls src/
main.js  modules  prod-confs.json  routes
brunorb@darkstar:~$ cat src/prod-confs.json
{
	"MONEEDA_TOKEN": "put your token HERE"
}
```

You can also change other confs like SERVER_HOST (which defaults to localhost) or SERVER_PORT (which defaults to 8081) using the prod-confs.json file, but please note that _if you change the host or port you need to recompile the `vue client`_ which you can be done by running `yarn run full` (or npm) (besides recompiling the client the `full` command will also start the backend server).

## Structure of the app

- `src` contains the Backend/server. The most interesting parts are probably in `src/modules/product.js` which has the method to compute the intersection of the exchanges (with some nice docs) and `src/routse/products.js` which receive the client requests and "redirect" them to the moneeda API;

- `vueclient` has the Vue.js Frontend/client. Everything relevant is in `vueclient/src/components/ListPage.vue`;

- `test` has some basic unit tests in `test/ProductTest.js`.




## Tests

There are some basic unit tests in `test/ProductTest.js`. You can run them with `MONEEDA_TOKEN=[full_token] yarn|npm run test`, or `yarn|npm run test` if you have src/prod-confs.json with the token.




