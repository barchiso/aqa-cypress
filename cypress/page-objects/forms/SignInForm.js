class SignInForm {
	get emailField() {
		return cy.get('#signinEmail');
	}

	get passwordField() {
		return cy.get('#signinPassword');
	}

	get loginButton() {
		return cy.get('button[class="btn btn-primary"]');
	}

	login(email, password) {
		this.emailField.should('be.visible').type(email);
		this.passwordField.should('be.visible').type(password);
		this.loginButton.should('be.visible').click();
	}
}

export default new SignInForm();
