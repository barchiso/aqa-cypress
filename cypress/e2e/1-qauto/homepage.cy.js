/// <reference types="cypress" />

// 1. In the repository, create a new branch to complete the task.
// 2. Go to the application https://qauto.forstudy.space/.
// 3. Write several tests and combine them in one block of describe,
// the tests must find all the buttons from the hover.
// And all the links and buttons from the footer.
// 4. When writing tests, use the learned approaches
// and Best Practices to work with the elements.
// 5. After writing, run the tests in UI mode and make sure
// that all items are found correctly and the tests are error-free.
// 6. Send the code to the repository and create a pull request.

describe('Find elements', () => {
	beforeEach(() => {
		cy.visit('https://qauto.forstudy.space/', {
			auth: {
				username: 'guest',
				password: 'welcome2qauto',
			},
		});
	});

	describe('Headers elements', () => {
		it('Display logo', () => {
			cy.get('.header_logo')
				.should('be.visible')
				.find('svg') // Check if the <svg> element is inside .header_logo
				.should('exist'); // Verify the <svg> element exists
		});
		it('Display navigation buttons', () => {
			// Check that all navigation buttons are visible
			cy.get('.header_nav').should('be.visible');

			// Validate buttons text
			cy.get('.header_nav .btn.header-link').each((button, index) => {
				const expectedTexts = ['Home', 'About', 'Contacts'];
				cy.wrap(button)
					.invoke('text')
					.should('include', expectedTexts[index]);
			});
		});
		it('Display "Guest log in" and "Sign In" buttons', () => {
			// Check that all navigation buttons are visible
			cy.get('.-guest')
				.should('be.visible') // Ensure the button is visible
				.and('contain.text', 'Guest log in'); // Assert the text content

			// Check the "Sign In" button
			cy.get('.header_signin')
				.should('be.visible') // Ensure the button is visible
				.and('contain.text', 'Sign In'); // Assert the text content
		});
	});

	describe('Footer elements', () => {
		it('Check if the "Contacts" heading is visible', () => {
			cy.get('h2').contains('Contacts').should('be.visible'); // Ensure the heading is visible
		});

		it('Check social media icons', () => {
			// Verify social media links
			const expectedUrls = [
				'https://www.facebook.com/Hillel.IT.School',
				'https://t.me/ithillel_kyiv',
				'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
				'https://www.instagram.com/hillel_itschool/',
				'https://www.linkedin.com/school/ithillel/',
			];

			cy.get('.contacts_socials .socials_link').each(($link, index) => {
				// Check if each link is visible
				cy.wrap($link)
					.should('be.visible')
					.and('have.attr', 'target', '_blank'); // Ensure each link opens in a new tab

				// Verify the correct URLs for each social media
				cy.wrap($link).should(
					'have.attr',
					'href',
					expectedUrls[index],
				); // Compare with the URL from the array
			});
		});

		it('Check the contacts links', () => {
			// Check the "ithillel.ua" website link
			cy.get('.contacts_link.display-4')
				.should('be.visible')
				.and('have.attr', 'href', 'https://ithillel.ua'); // Verify the link to the website

			// Check the "support@ithillel.ua" email link
			cy.get('.contacts_link.h4')
				.should('be.visible')
				.and('have.attr', 'href', 'mailto:developer@ithillel.ua'); // Verify the email link
		});
		it('Check the footer content', () => {
			// Verify the copyright text is visible
			cy.get('.footer_item.-left p')
				.eq(0) // The first <p> element in the left column
				.should('be.visible')
				.and('contain.text', '© 2021 Hillel IT school');

			// Verify the description text is visible
			cy.get('.footer_item.-left p')
				.eq(1) // The second <p> element in the left column
				.should('be.visible')
				.and(
					'contain.text',
					'Hillel auto developed in Hillel IT school for educational purposes of QA courses.',
				);
		});
		it('Check footer logo', () => {
			cy.get('.footer_logo')
				.should('be.visible')
				.find('svg') // Check if the <svg> element is inside .footer_logo
				.should('exist'); // Verify the <svg> element exists
			// cy.get('.footer_logo svg').should('be.visible');
		});
	});
});
