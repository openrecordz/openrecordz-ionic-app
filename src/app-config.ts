

// source : https://stackoverflow.com/questions/39576991/ionic2-angular2-read-a-custom-config-file

import { InjectionToken } from '@angular/core';

// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
    urlApi: string;
    domain: string;
    devWebSite : string;
}

// Configuration values for our app
export const APP_CONFIG: ApplicationConfig = {
    domain: "soleto.openrecordz.com",
    devWebSite: "http://soleto.openrecordz.com/datasets#",
    urlApi: "http://soleto.api.openrecordz.com/service/v1",   
};

// Create a config token to avoid naming conflicts
export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('openrecordz-soleto-opendata');