# Openrecordz Sample App

## Pre requisiti 
### Requisiti tecnici 
Per creare un'App con Openrecordz assicurarsi di avere installato:
* la versione più recente di [Apache Cordova](http://cordova.apache.org/)
* la versione più recente di[Node.js](https://nodejs.org/en/)
* [Ionic 3](https://ionicframework.com/docs/v1/overview/#download) 
* Un IDE compatibile. Si consiglia [Visual Studio Code](https://code.visualstudio.com/download)

Per ulteriori dettagli si consiglia di seguire la [Dcoumentazione ufficiale](https://ionicframework.com/docs/v1/guide/installation.html)

### Altri requisiti
Registrati su [Openrecordz](http://www.openrecordz.com) e accedi alla tua dashboard

Per l'utilizzo della [console](http://apps.openrecordz.com/dashboard) fare riferimento al [wiki](https://github.com/openrecordz/openrecordz-ionic-app/wiki)

### Installazione
Clonare o scaricare Openrecordz Ionic [Sample App](https://github.com/openrecordz/openrecordz-ionic-app) sulla tua macchina

Estrarre l'archivio e posizionarsi nella root del progetto appena scaricato ed eseguire il comando 

`$ npm install` 


## Configurazione
### APP_CONFIG
* **defaultLanguage** : lingua predefinita dell'app

* **defaultLanguage** : lingua predefinita dell'app
  * **it** per l'italiano;
  * **en** per l'inglese;
* **urlApi** : Servizi per un portale. Es.: "http://<MY_PORTAL>.api.openrecordz.com/service/v1"
* **domain** : Dominio per un portal. Es.: "<MY_PORTAL>.openrecordz.com"
* **developer** : Identificativo dello sviluppatore da mostrare nella scheda "Informazioni"
* **devWebSite** : Sito dello sviluppatore da mostrare nella scheda "Informazioni"
* **aboutMap** : @TODO
* **oneSignalAppId** : Identificativo dell'app su Onesignal per l'invio delle notifiche push - fornita da Onesignal
* **oneSignalRestApiKey** : Chiave necessaria per l'invio delle notifiche push - fornita da Onesignal
* **firebaseSenderId**: Sender id necessario per l'invio delle notifiche push
* **mailgunUrl** : URL di Mailgun necessario per l'invio delle emaill - fornito da Mailgun
* **mailgunApiKey** : Chiave necessaria per l'invio delle email - fornita da Mailgun
