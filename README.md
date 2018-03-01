# Openrecordz Sample App

## Pre-requisites
### Technical requirements 
To create an Openrecordz App make sure you have installed:
* the last version of [Apache Cordova](http://cordova.apache.org/)
* the last version of [Node.js](https://nodejs.org/en/)
* [Ionic 3](https://ionicframework.com/docs/v1/overview/#download) 
* A compatible IDE. It is suggested [Visual Studio Code](https://code.visualstudio.com/download)

For more details follow the [Offical Documentation](https://ionicframework.com/docs/v1/guide/installation.html)

### Other requirements
Sign in on [Openrecordz](http://www.openrecordz.com) and access to your dashboard

For the use of the [console](http://apps.openrecordz.com/dashboard) refer to the [wiki](https://github.com/openrecordz/openrecordz-ionic-app/wiki)

## Install
Clone or download Openrecordz Ionic [Sample App](https://github.com/openrecordz/openrecordz-ionic-app) on your envirnoment

Extract the archive. 

Move to the root of the project and run 

`$ npm install` 


## Configuration

Open the file  **app-config.ts** under **/src/** and edit it with your settings:

* **defaultLanguage** : default app language:
  * **it** for Italiam;
  * **en** for English;
* **urlApi** : API url for a portal. i.e.: "http://<MY_PORTAL>.api.openrecordz.com/service/v1";
* **domain** : Domain for a portal. i.e.: "<MY_PORTAL>.openrecordz.com";
* **developer** : Developer name within About tab;
* **devWebSite** : Developer website  within About tab;
* **oneSignalAppId** : Onesignal [App ID](https://documentation.onesignal.com/docs/accounts-and-keys#section-app-id);
* **oneSignalRestApiKey** : Onesignal [rest API Key](https://documentation.onesignal.com/docs/accounts-and-keys#section-app-auth-key);
* **firebaseSenderId**: Firebase [sender ID](https://firebase.google.com/docs/cloud-messaging/concept-options#credentials) for push notifications;
* **mailgunUrl** : Mailgun domain (i.e.: XXXXXXXXXXXXX.mailgun.org);
* **mailgunApiKey** : Mailgun API Key
* **aboutMap** : It is possible to customize the menu within the About tab adding a json structured as follows
```
[
       {
           "header": "<CARD TITLE>",
           "values" : [
               {
                   "key": "<ITEM>",
                   "value": "<VALUE >",
               },
               ....
           ]
       },
       .....
]
```

For example the following map 
```
aboutMap: [
       {
           "header": "Socials",
           "values" : [
               {
                   "key": "Facebook",
                   "value": "https://www.facebook.com/",
               },
               {
                   "key": "Twitter",
                   "value": "https://twitter.com/"
               },
               {
                   "key": "LinkedIn",
                   "value": "https://www.linkedin.com/"
               },
           ]
       },

        {
            "header": "Search engines",
            "values": [
                {
                    "key": "Google",
                    "value": "https://www.google.com/",
                },
                {
                    "key": "Bing",
                    "value": "https://www.bing.com/"
                },
                {
                    "key": "Ask.com",
                    "value": "https://it.ask.com/"
                },
            ]
        },
    ],
```
will generate the following result 

<img src="https://preview.ibb.co/cD5H3H/Screenshot_20180301_161547.png" width="250">


## Run 
### Supported platforms

The supported platforms are Android and iOS

#### Android 

Add the platform with 

`$ ionic cordova platform add android`  

To run on an **emulator** run the following

`$ ionic cordova emulate android --prod`

To run on a **real device** run the following 

`$ ionic cordova run android --device --prod`

#### iOS

Add the platform with 

`$ ionic cordova platform add ios`

To run on an **emulator** run the following

`$ ionic cordova emulate ios --prod` 
