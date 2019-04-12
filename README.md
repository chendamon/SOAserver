# SOAserver
A test for OAuth2.0 server.

## How to use?

First, you need run `node save_client.js` to initialize clients database.

` git clone https://github.com/chendamon/SOAserver.git&&
   cd SOAserver&&
   npm install&&
   npm start`

## Use with docker

Make sure there is a mongodb instance run in your environment, then open SOAserver run `docker build -t your-tag .` build your docker image.

Then build a local directory `config` with `config.json` in it,`config.js` should tell the program where your mongodb instance is.
```
{
  "mongoose":{
    "uri":"mongodb://sso:epbcc123@172.17.0.1:27017/SSO"
  }
}
```

To run a container, use `docker run --name your-container-name --network some-network -p your-port:3000 -v somedir:/usr/src/app/config -d your-image-name`
