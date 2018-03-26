
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
    defaultLanguage: "it",
    urlApi: "http://soleto.api.openrecordz.com/service/v1",
    domain: "soleto.openrecordz.com",
    developer: "Openrecordz",
    devWebSite: "http://soleto.openrecordz.com/datasets#",
    aboutMap: [
       {
           "header": "Informazioni",
           "values" : [
               {
                   "key": "Sito Istituzionale",
                   "value": "http://www.comune.soleto.le.it/",
               },
               {
                   "key": "Privacy",
                   "value": "http://www.comune.soleto.le.it/sezione-informazioni/privacy"
               },
           ]
       }
    ],
    // oneSignalAppId: "0e1c23bc-c1bd-455f-a408-da2739870c4f",
    oneSignalAppId: "73fe3e5c-7e0f-45bb-bd2a-939aa1586185",
    // oneSignalRestApiKey: "ZDRlY2Q2ZjUtODBlMi00NzVhLTliODEtMzc0Y2JmMzNkNzgz",
    oneSignalRestApiKey: "ZmE2NmY0N2UtODZmNS00ZjVkLWEzODctNDI3NzdkYTk0NzJi", 
    // firebaseSenderId: "537289267777",
    firebaseSenderId: "447400359251",
    mailgunUrl: "sandbox208ae9b676e04fd88e5674984a56aad6.mailgun.org",
    mailgunApiKey: "api:key-bb704680746b52474673275176ae7216"
};

// Create a config token to avoid naming conflicts
export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('openrecordz-soleto-opendata');
