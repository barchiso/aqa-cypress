import homePage from '../../page-objects/pages/HomePage';
import signInForm from '../../page-objects/forms/SignInForm';
import garagePage from '../../page-objects/pages/GaragePage';
import fuelExpensesPage from '../../page-objects/pages/FuelExpensesPage';
import carDeletionForm from '../../page-objects/forms/CarDeletionForm';

const email = Cypress.env('USER_EMAIL'); // Get email from environment variable
const password = Cypress.env('USER_PASSWORD');

describe('Add car, fuel expenses, and delete car', () => {
	const car = {
		brand: 'Audi',
		model: 'TT',
		mileage: '10000',
	};

	const today = new Date();
	const formattedDate = today
		.toLocaleDateString('uk-UA')
		.replace(/\//g, '.'); // Converts to dd.MM.yyyy format for Ukraine

	const expense = {
		vehicle: 'Audi TT',
		date: formattedDate, // Automatically generated current date in dd.MM.yyyy format
		mileage: '10500',
		liters: '50',
		totalCost: '100000',
	};

	// Before hook to handle login and navigate to the garage page
	beforeEach(() => {
		homePage.open();
		homePage.clickSignInButton();
		signInForm.login(email, password); // Use credentials from config
		garagePage.verifyUrl(); // Verify successful login and garage page navigation
	});

	it('Add a new car', () => {
		// Add a new car
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
