import BasePage from './BasePage';

class FuelExpensesPage extends BasePage {
	get addExpenseButton() {
		return cy.contains('.btn-primary', 'Add an expense');
	}

	get vehicleSelect() {
		return cy.get('#addExpenseCar');
	}

	get expenseDateInput() {
		return cy.get('#addExpenseDate');
	}

	get mileageInput() {
		return cy.get('#addExpenseMileage');
	}

	get litersInput() {
		return cy.get('#addExpenseLiters');
	}

	get totalCostInput() {
		return cy.get('#addExpenseTotalCost');
	}

	get saveExpenseButton() {
		return cy.contains('.modal-footer .btn-primary', 'Add');
	}

	addFuelExpense(expense) {
		this.addExpenseButton.should('be.visible').click();
		this.vehicleSelect.should('be.visible').select(expense.vehicle);
		this.expenseDateInput.should('be.visible').clear().type(expense.date);
		this.mileageInput.should('be.visible').clear().type(expense.mileage);
		this.litersInput.should('be.visible').type(expense.liters);
		this.totalCostInput.should('be.visible').type(expense.totalCost);
		this.saveExpenseButton.should('be.visible').click();
	}

	verifyExpenseAdded(expense) {
		cy.get('.expenses_table').should('be.visible');
		cy.contains('.font-weight-bold', expense.date).should('be.visible');
		cy.contains('tbody tr td:nth-child(2)', expense.mileage).should(
			'be.visible',
		);
		cy.contains('tbody tr td:nth-child(3)', expense.liters).should(
			'be.visible',
		);
		cy.contains('tbody tr td:nth-child(4)', expense.totalCost).should(
			'be.visible',
		);
	}

	open() {
		super.open('/panel/expenses');
	}
}

export default new FuelExpensesPage();
