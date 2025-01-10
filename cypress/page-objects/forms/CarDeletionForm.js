class CarDeletionForm {
	get editCarButton() {
		return cy.get('.icon.icon-edit');
	}

	get deleteCarButton() {
		return cy.get('.btn-outline-danger');
	}

	get confirmDeleteButton() {
		return cy.get('.btn-danger');
	}

	get successAlert() {
		return cy.get('div[class="alert alert-success"] p');
	}

	deleteCar() {
		this.editCarButton.should('be.visible').click();
		this.deleteCarButton.should('be.visible').click();
		this.confirmDeleteButton.should('be.visible').click();
	}

	verifyCarDeleted() {
		this.successAlert
			.should('be.visible')
			.and('contain.text', 'Car removed');
		this.editCarButton.should('not.exist');
	}
}

export default new CarDeletionForm();
