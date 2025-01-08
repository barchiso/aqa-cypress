import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
		fixturesFolder: 'cypress/fixtures',
		specPattern: '**/*.cy.{js,jsx,ts,tsx}',
		screenshotOnRunFailure: true,
		screenshotsFolder: 'cypress/screenshots',
		video: false,
		videosFolder: 'cypress/videos',
		chromeWebSecurity: false,
	},
});
