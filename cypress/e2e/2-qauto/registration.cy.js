// In the repository, create a new branch to complete the task.
// Go to the application https://qauto.forstudy.space/.
// Write tests that will cover the registering functionality in accordance with the requirements
// (PLEASANT when creating a new account to use the original email, eg, with some prefix to avoid conflicts)
// After creating the account, create a custom command login (),
// which will perform a login with the specified credentials to log in through UI
// Redefine the type command according to the example from the documentation so that when entering passwords,
// the password itself is not displayed in the Cypress logos
// After writing, run the tests in UI mode and make sure all the tests are error-free.

import '../../support/commands';

const uniqueEmail = `bohdan.lutsyk86+TestUser1+${Date.now()}@gmail.com`;
const uniquePassword = 'Password1!';

describe('Registration Tests.', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('.btn-primary').click();
	});

	describe('Registration Form Elements Display.', () => {
		it('Registration form title display.', () => {
			cy.get('.modal-title')
				.should('be.visible')
				.and('contain.text', 'Registration');
		});
		it('Name field display.', () => {
			cy.get('.form-group label[for="signupEmail"]')
				.eq(0)
				.should('be.visible')
				.and('contain', 'Name');
			cy.get('#signupName')
				.should('be.visible')
				.and('have.attr', 'type', 'text');
		});
		it('Last name field display.', () => {
			cy.get('.form-group label[for="signupEmail"]')
				.eq(1)
				.should('be.visible')
				.and('contain', 'Last name');
			cy.get('#signupLastName')
				.should('be.visible')
				.and('have.attr', 'type', 'text');
		});
		it('Email field display.', () => {
			cy.get('.form-group label[for="signupEmail"]')
				.eq(2)
				.should('be.visible')
				.and('contain', 'Email');
			cy.get('#signupEmail')
				.should('be.visible')
				.and('have.attr', 'type', 'text');
		});
		it('Password field display.', () => {
			cy.get('.form-group label[for="signupPassword"]')
				.should('be.visible')
				.and('contain', 'Password');
			cy.get('#signupPassword')
				.should('be.visible')
				.and('have.attr', 'type', 'password');
		});
		it('Re-enter password field display.', () => {
			cy.get('.form-group label[for="signupRepeatPassword"]')
				.should('be.visible')
				.and('contain', 'Re-enter password');
			cy.get('#signupRepeatPassword')
				.should('be.visible')
				.and('have.attr', 'type', 'password');
		});
		it('Register button display.', () => {
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled')
				.and('contain', 'Register')
				.and('have.attr', 'type', 'button');
		});
		it('Close modal button display and functionality.', () => {
			cy.get('span[aria-hidden="true"]')
				.should('be.visible')
				.and('contain', '×');
			// Click the close button
			cy.get('button[type="button"][aria-label="Close"].close').click();
			// Verify that the modal is no longer visible
			cy.get('.modal-content').should('not.exist');
		});
	});

	describe('Fields Validation Tests.', () => {
		// Helper function to trim input and validate
		const validateFieldWithTrim = (fieldSelector, value, errorMessage) => {
			const trimmedValue = value.trim();
			cy.get(fieldSelector).clear();
			cy.get(fieldSelector).type(trimmedValue);
			cy.get(fieldSelector).blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', errorMessage);
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');
		};

		// Validate red border for a field
		const checkRedBorder = (fieldSelector) => {
			cy.get(fieldSelector).should(
				'have.css',
				'border-color',
				'rgb(220, 53, 69)',
			);
		};

		it('Validate "Name" field.', () => {
			cy.get('#signupName').focus();
			cy.get('#signupName').blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', 'Name required');
			checkRedBorder('#signupName');
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');

			// Invalid length validation
			validateFieldWithTrim(
				'#signupName',
				'A',
				'Name has to be from 2 to 20 characters long',
			);
			checkRedBorder('#signupName');

			validateFieldWithTrim(
				'#signupName',
				'JohnnyJohnnyJohnnyJohnny',
				'Name has to be from 2 to 20 characters long',
			);
			checkRedBorder('#signupName');

			// Invalid characters validation
			validateFieldWithTrim('#signupName', 'Johnny@', 'Name is invalid');
			checkRedBorder('#signupName');
		});

		it('Validate "Last Name" field.', () => {
			cy.get('#signupLastName').focus();
			cy.get('#signupLastName').blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', 'Last name required');
			checkRedBorder('#signupLastName');
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');

			// Invalid length validation
			validateFieldWithTrim(
				'#signupLastName',
				'A',
				'Last name has to be from 2 to 20 characters long',
			);
			checkRedBorder('#signupLastName');

			validateFieldWithTrim(
				'#signupLastName',
				'BravoBravoBravoBravoBravo',
				'Last name has to be from 2 to 20 characters long',
			);
			checkRedBorder('#signupLastName');

			// Invalid characters validation
			validateFieldWithTrim(
				'#signupLastName',
				'Bravo@',
				'Last name is invalid',
			);
			checkRedBorder('#signupLastName');
		});

		it('Validate "Email" field.', () => {
			cy.get('#signupEmail').focus();
			cy.get('#signupEmail').blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', 'Email required');
			checkRedBorder('#signupEmail');
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');

			// Invalid characters validation
			validateFieldWithTrim(
				'#signupEmail',
				'johnny.bravo@',
				'Email is incorrect',
			);
			checkRedBorder('#signupEmail');
		});

		it('Validate "Password" field.', () => {
			cy.get('#signupPassword').focus();
			cy.get('#signupPassword').blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', 'Password required');
			checkRedBorder('#signupPassword');
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');

			validateFieldWithTrim(
				'#signupPassword',
				'short',
				'Password has to be from 8 to 15 characters long',
			);

			checkRedBorder('#signupPassword');

			validateFieldWithTrim(
				'#signupPassword',
				'LongLongLongLong',
				'Password has to be from 8 to 15 characters long',
			);
			checkRedBorder('#signupPassword');

			validateFieldWithTrim(
				'#signupPassword',
				'NoDigits',
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
			);
			checkRedBorder('#signupPassword');
		});

		it('Validate "Re-enter Password" field.', () => {
			cy.get('#signupRepeatPassword').focus();
			cy.get('#signupRepeatPassword').blur();
			cy.get('.form-group .invalid-feedback p')
				.should('be.visible')
				.and('contain.text', 'Re-enter password required');
			checkRedBorder('#signupRepeatPassword');
			cy.get('button[class="btn btn-primary"]')
				.should('be.visible')
				.and('be.disabled');

			cy.get('#signupPassword').type('Password1!');
			validateFieldWithTrim(
				'#signupRepeatPassword',
				'Password1',
				'Passwords do not match',
			);
			checkRedBorder('#signupRepeatPassword');
		});
	});

	describe('User Successful Registration Test.', () => {
		it('Verify user successful registration.', () => {
			cy.get('#signupName').type('John');
			cy.get('#signupLastName').type('Doe');
			cy.get('#signupEmail').type(uniqueEmail);
			cy.get('#signupPassword').type(uniquePassword, {
				sensitive: true,
			});
			cy.get('#signupRepeatPassword').type(uniquePassword, {
				sensitive: true,
			});
			cy.get('button[class="btn btn-primary"]').click();
			cy.get('div[class="alert alert-success"] p')
				.should('be.visible')
				.and('contain.text', 'Registration complete');
			cy.get('#userNavDropdown')
				.should('be.visible')
				.and('contain.text', 'My profile');
		});

		it('Verify user successful login.', () => {
			cy.login(uniqueEmail, uniquePassword);
		});
	});
});
