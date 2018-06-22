# Pre requisites

## Configuring environment
Follow the [installation guide](https://github.com/openrecordz/openrecordz-ionic-app/wiki/Installation-guide) to set up your working environment 

## Signin to Openrecordz
Sign in on [Openrecordz](http://www.openrecordz.com) and access to your dashboard

For the use of the [console](http://apps.openrecordz.com/dashboard) refer to the [wiki](https://github.com/openrecordz/openrecordz-web-console/wiki)

# Clone repository

Change to your prefered directory and type

```
$ git clone https://github.com/openrecordz/openrecordz-ionic-app.git 
```

# Setting up the project

```
$ cd openrecordz-ionic-app/ 
$ npm install
```

## Customizations

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

# Platforms

## Web (Dev mode)

Run the app in dev mode with: 

`$ ionic serve`

Remember to modifiy  the parameter OneSignal.setDefaultNotificationUrl presente into index.html

Build with : 
`npm run ionic:build --base-href /soleto/`

or in prod with:
`npm run ionic:build --prod --base-href /soleto/`

Deploy on AWS S3 with(Prerequisite: AWS CLI installed):

`aws s3 sync ./www s3://<AWS_S3_BUCKET>`

For example:

`aws s3 sync ./www s3://openrecordz-com-webapp/soleto`. (Example demo app published here https://app.openrecordz.com/soleto/index.html)



Invalidate with: 

 `aws cloudfront create-invalidation --distribution-id EIO8LJQKD0TL1 --paths "/*"`

## Android

```
ionic cordova platform add android
```

### Run 

Attaach your device and authorize it. Check if it is attached successfully

```
$ adb devices
```

The previous instruction will prompts something like

```
root@ubuntu:/opt/android-sdk/tools# adb devices
List of devices attached
05a7df5c0a74af63	device
```

Run on the device 

```
ionic cordova run android --device --prod
```
