import { defineConfig } from 'cypress';

import 'cypress-mochawesome-reporter/plugin.js';

export default defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		reportDir: 'cypress/reports',
		overwrite: true,
	},
	e2e: {
		baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
		env: {
			USER_EMAIL: 'bohdan.lutsyk86+TestUser20@gmail.com',
			USER_PASSWORD: 'Password2',
		},
		fixturesFolder: 'cypress/fixtures',
		specPattern: '**/*.cy.{js,jsx,ts,tsx}',
		screenshotOnRunFailure: true,
		screenshotsFolder: 'cypress/screenshots',
		video: true,
		videosFolder: 'cypress/videos',
		chromeWebSecurity: false,
		defaultBrowser: 'chrome',
		trashAssetsBeforeRuns: true, // Enable trash asset cleanup
		setupNodeEvents(on, config) {
			import('cypress-mochawesome-reporter/plugin.js').then((module) => {
				module.default(on);
				return config;
			});
		},
	},
});
