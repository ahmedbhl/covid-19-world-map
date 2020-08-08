// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const prefixUrl = 'https://api.covid19api.com';

export const environment = {

  covid_api_url: `${prefixUrl}`,
  covid_api_backend_type: 'typescript',

  countries_api_url: `${prefixUrl}/countries`,
  countries_api_backend_type: 'typescript',

  /** used to know if it is a production environment or not */
  production: false,

  /** Environment platform name */
  name: 'dev',

  /** Activate Logs */
  log: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
