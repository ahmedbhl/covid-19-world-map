const prefixUrl = 'https://api.covid19api.com';

export const environment = {

  covid_api_url: `${prefixUrl}/summary`,
  covid_api_backend_type: 'typescript',

  countries_api_url: `${prefixUrl}/countries`,
  countries_api_backend_type: 'typescript',

  /** is a production environment or not */
  production: true,

  /** Environment platform name */
  name: 'Prod',

  /** Activate Logs - disabled in prod env */
  log: false,
};
