import BasePage from './BasePage';

class GaragePage extends BasePage {
	get addCarButton() {
		return cy.get('button:contains("Add car")');
	}

	get carBrandSelect() {
		return cy.get('#addCarBrand');
	}

	get carModelSelect() {
		return cy.get('#addCarModel');
	}

	get carMileageInput() {
		return cy.get('#addCarMileage');
	}

	get saveCarButton() {
		return cy.contains('.modal-footer .btn-primary', 'Add');
	}

	// Method to delete all cars
	deleteAllCars() {
		this.editButtons.each(() => {
			// Call the delete car method from CarDeletionForm
			this.editButtons.click(); // Simulate click to open the delete form
			cy.get('.delete-car-button').click(); // Assuming there's a delete button to confirm
		});
	}

	addCar(car) {
		this.addCarButton.should('be.visible').click();
		this.carBrandSelect.should('be.visible').select(car.brand);
		this.carModelSelect.should('be.visible').select(car.model);
		this.carMileageInput.should('be.visible').type(car.mileage);
		this.saveCarButton.should('be.visible').click();
	}

	verifyCarAdded(car) {
		cy.contains('.car_name.h2', car.model).should('be.visible');
		cy.contains('.car_base', car.brand).should('be.visible');
		cy.get('.icon.icon-edit').should('be.visible').click();
		cy.get('#addCarBrand').should('be.visible');
		cy.get('#addCarModel').should('be.visible');
		cy.get('span[aria-hidden="true"]').click();
	}

	verifyUrl() {
		cy.url().should('include', '/panel/garage');
	}

	open() {
		super.open('/panel/garage');
	}
}

export default new GaragePage();
