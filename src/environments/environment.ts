// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  url_api: 'http://127.0.0.1:8000/api/',
  production: false,
  LOCALSTORAGE_THEME:'5019520ddc9999c3de04259d855b9e008e0fc1329cde42ae0795a1170ce3a041',
  APP_NAME:'Car Share',
  APP_VERSION:'1.1.0',
  ANGULAR_VERSION:'11.2'
};
export const temas = [
  {label:'Rodrigo',value:'rodrigo'},
  {label:'Alejandro',value:'alejandro'},
  {label:'Jorge',value:'jorge'}
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
