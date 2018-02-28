
// source : https://stackoverflow.com/questions/39576991/ionic2-angular2-read-a-custom-config-file

import { InjectionToken } from '@angular/core';

// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
    defaultLanguage: string;
    urlApi: string;
    domain: string;
    developer: string;
    devWebSite: string;
    aboutMap: Array<any>;
    oneSignalAppId: string;
    oneSignalRestApiKey: String,
    firebaseSenderId: string,
    mailgunUrl,
    mailgunApiKey;
}

// Configuration values for our app
export const APP_CONFIG: ApplicationConfig = {
    defaultLanguage: "en",
    urlApi: "",
    domain: "",
    developer: "",
    devWebSite: "",
    aboutMap: [
       {
           "header": "Informazioni",
           "values" : [
               {
                   "key": "Privacy",
                   "value": ""
               },
           ]
       }
    ],
    oneSignalAppId: "",
    oneSignalRestApiKey: "",
    firebaseSenderId: "",
    mailgunUrl: "",
    mailgunApiKey: ""
};

// Create a config token to avoid naming conflicts
export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('');
