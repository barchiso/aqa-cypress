import homePage from '../../page-objects/pages/HomePage';
import signInForm from '../../page-objects/forms/SignInForm';
import garagePage from '../../page-objects/pages/GaragePage';
import fuelExpensesPage from '../../page-objects/pages/FuelExpensesPage';
import carDeletionForm from '../../page-objects/forms/CarDeletionForm';
import qautoConfig from '../../config/qauto-config'; // Default config
import qauto2Config from '../../config/qauto2-config'; // qauto2 config

let config;

if (Cypress.env('CYPRESS_ENV') === 'qauto2') {
	// When running with CYPRESS_ENV=qauto2, use qauto2Config data
	config = qauto2Config;
} else {
	// When running with default settings, use qautoConfig
	config = qautoConfig;
}

describe('Add car, fuel expenses, and delete car', () => {
	const car = {
		brand: 'Audi',
		model: 'TT',
		mileage: '10000',
	};

	const expense = {
		vehicle: 'Audi TT',
		date: '9.01.2025',
		mileage: '10500',
		liters: '50',
		totalCost: '100000',
	};

	// Before hook to handle login and navigate to the garage page
	beforeEach(() => {
		homePage.open();
		homePage.clickSignInButton();
		signInForm.login(config.uniqueEmail, config.uniquePassword); // Use credentials from config
		garagePage.verifyUrl(); // Verify successful login and garage page navigation
	});

	it('Add a car and verify it is added', () => {
		// Add a car and verify it's added
		garagePage.addCar(car);
		garagePage.verifyCarAdded(car);
	});

	it('Add a fuel expense and verify it is added', () => {
		// Add a fuel expense and verify it's added
		fuelExpensesPage.open();
		fuelExpensesPage.addFuelExpense(expense);
		fuelExpensesPage.verifyExpenseAdded(expense);
	});

	it('Delete the car and verify it is removed', () => {
		// Go back to the garage, edit the car, and delete it
		garagePage.open();
		carDeletionForm.deleteCar();
		carDeletionForm.verifyCarDeleted();
	});
});
