
// source : https://stackoverflow.com/questions/39576991/ionic2-angular2-read-a-custom-config-file

import { InjectionToken } from '@angular/core';

// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
    defaultLanguage: string;
    urlApi: string;
    domain: string;
    developer : string;
    devWebSite : string;
    sites: Array<any>;
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
    sites: [
        {
            "key" : "Sito Istituzionale", 
            "value": "http://www.comune.soleto.le.it/", 
        },
        { 
            "key": "Privacy",
            "value": "http://www.comune.soleto.le.it/sezione-informazioni/privacy"
        },
    ],
    oneSignalAppId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    oneSignalRestApiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    firebaseSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    mailgunUrl: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    mailgunApiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

// Create a config token to avoid naming conflicts
export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('openrecordz-soleto-opendata');
