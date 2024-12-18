import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'https://example.cypress.io',
		fixturesFolder: 'cypress/fixtures',
		specPattern: '**/*.cy.{js,jsx,ts,tsx}',
		screenshotOnRunFailure: true,
		screenshotsFolder: 'cypress/screenshots',
		video: false,
		videosFolder: 'cypress/videos',
		chromeWebSecurity: false,
	},
});
