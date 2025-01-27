// Task 2:
// Using substitution (intercepting),
// make sure that when you open the Profile page,
// the name of the user changes from the real to Polar Bear.
// Make sure that the UI displays a valid name.

/// <reference types="cypress" />
import data from '../../fixtures/credentials.json';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/forms/SignInForm';
import GaragePage from '../../page-objects/pages/GaragePage';

const PROFILE_URL = 'https://qauto.forstudy.space/panel/profile';

describe('Test Profile Page', () => {
	beforeEach(() => {
		HomePage.open();
		HomePage.clickSignInButton();
	});

	it('Intercept and change user name to Polar Bear', () => {
		// Intercept the GET request for user profile and modify the response
		cy.intercept('GET', '/api/users/profile', (req) => {
			req.reply((res) => {
				res.body.data.name = 'Polar';
				res.body.data.lastName = 'Bear';
			});
		}).as('getUserProfile');

		SignInForm.login(data.email, data.password);
		GaragePage.clickProfileButton();
		cy.url().should('eq', PROFILE_URL);
		cy.get('.profile_name.display-4').should('contain', 'Polar Bear');
	});
});
