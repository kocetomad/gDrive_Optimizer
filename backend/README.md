<img src="https://i.imgur.com/p3WtimU.png"></img>
# gDrive Optimizer backend 
The current host of all endpoints is: 

> punchy.servebeer.com:4000

## API
For the purpouse of this App the REST API microservice only has one route that being 
``HTTP POST /fetchMultipleFiles`` which is used for passing user files from the forntend the requests have to be in ``JSON`` format and request body should look like this:
```{

"fileID": [

"1aZzke6BQyDGrxw6VGanlADPZ1Bu_Od9k",

"1gjUWZEltoi9JRyCBCYeNbgOJWPjNGLAz"

],

"token": "ya29.A0AfH6SMA2Z7-FT73ZBNmzrZ0SaMgnWWYsNA_zJzXbkZSWyu9_Xp0KD-mlWLPV6oVu3WdK4VpIANWDyPetHUwXeVMrMm3dYdYxDVrHIDMu913zdZ4Zi5mPVBMlKxntnvQ6zRtxMs4obG7Wzt_fg7vglW50cd5gYTa_mITdTT3-2-M",

"email": "smth@smth.com"

} 
```
In the above example the ```fileID``` field indicates the file ID's of the files being sent (retrieved form the Google Drive API) also you can pass just a single ID if necessery. The ``token`` field indicates the access token of the user recieved from the ``oAuth2`` process on the front-end. The ``email`` field indicates the email of the user whose files are being to be processed trough the app. Test request can be perfomed using [Postman](https://www.postman.com/). 

## Installation

The backend relies on the [handbrake-js](https://www.npmjs.com/package/handbrake-js) for video compression thus requires all handbrake dependencies to be installed.The project rquires a supported version of `NodeJS` and `npm` installed .This is done as follows:
```
sudo add-apt-repository --yes ppa:stebbins/handbrake-releases
sudo apt-get update -qq
sudo apt-get install -qq handbrake-cli
npm install -g handbrake-js
```
for all other npm packages simply run:
```
cd backend 
npm i
```
To run the backend and all its microservices:
```
npm start 
OR 
npm dev -> to run debugging mode
```

## Deployment specific dependencies 
<img src="https://raw.githubusercontent.com/Unitech/pm2/development/pres/pm2-v4.png"></img>

The App  is designed to work in load balanced cluster mode for which we use `pm2` as process manager as it solves a lot of NodeJS specific problems. To use pm2 first we nee to install it: 
```
npm install pm2 -g
```
to run the app in cluster mode with ``i`` being the number instances, in the case below ``max`` will run as many instances as the server hardware effectively allows :
```
cd backend
pm2 start index.js -i max
```




## Repo content

 - [backend](https://github.com/kocetomad/gDrive_Optimizer/tree/main/backend) 
 - [frontend](https://github.com/kocetomad/gDrive_Optimizer/tree/main/frontend) 



