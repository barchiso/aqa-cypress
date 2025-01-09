import { defineConfig } from 'cypress';

import 'cypress-mochawesome-reporter/plugin.js';
import qautoConfig from './cypress/config/qauto-config.js';
import qauto2Config from './cypress/config/qauto2-config.js';

const environment = process.env.CYPRESS_ENV || 'qauto'; // Default to 'qauto' if no environment variable is set
const config = environment === 'qauto2' ? qauto2Config : qautoConfig;

export default defineConfig({
	env: {
		qauto: qautoConfig,
		qauto2: qauto2Config,
	},
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		reportDir: 'cypress/reports',
		overwrite: true,
	},
	e2e: {
		baseUrl: config.baseUrl, // Use the selected config's baseUrl
		uniqueEmail: config.uniqueEmail, // Use the selected config's uniqueEmail
		uniquePassword: config.uniquePassword, // Use the selected config's uniquePassword
		fixturesFolder: 'cypress/fixtures',
		specPattern: '**/*.cy.{js,jsx,ts,tsx}',
		screenshotOnRunFailure: true,
		screenshotsFolder: 'cypress/screenshots',
		video: true,
		videosFolder: 'cypress/videos',
		chromeWebSecurity: false,
		defaultBrowser: 'chrome',
		trashAssetsBeforeRuns: false, // Disable trash asset cleanup
		setupNodeEvents(on, config) {
			import('cypress-mochawesome-reporter/plugin.js').then((module) => {
				module.default(on);
				return config;
			});
		},
	},
});
