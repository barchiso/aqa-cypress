// Task 3:
// Install any plugin for the test API
// Write 3 any API tests using the plugin method

/// <reference types="cypress" />
import data from '../../fixtures/credentials.json';
import carBrands from '../../fixtures/brands.json';
import carModels from '../../fixtures/models.json';

describe('API Tests Using cypress-plugin-api', () => {
	let sidValueGlobal;
	let carsIds = [];

	before(() => {
		cy.api({
			method: 'POST',
			url: '/api/auth/signin',
			body: {
				email: data.email,
				password: data.password,
				remember: data.remember,
			},
		}).then((response) => {
			expect(response.status).to.eq(200);
			const sidCookie = response.headers['set-cookie'][0];
			sidValueGlobal = sidCookie.split(';')[0].split('=')[1];
		});
	});

	it('Add a New Car', () => {
		cy.api({
			method: 'POST',
			url: '/api/cars',
			headers: {
				Cookie: `sid=${sidValueGlobal}`,
			},
			body: {
				carBrandId: carBrands.data[0].id,
				carModelId: carModels.data[3].id,
				mileage: 1000,
			},
		}).then((response) => {
			expect(response.status).to.eq(201);
			const carData = response.body.data;

			expect(carData.brand).to.eq(carBrands.data[0].title);
			expect(carData.model).to.eq(carModels.data[3].title);
			expect(carData.mileage).to.eq(1000);
			carsIds.push({
				id: carData.id,
				mileage: carData.mileage,
			});
			cy.log(
				`Added car: ID=${carData.id}, Brand=${carData.brand}, 
                Model=${carData.model}, Mileage=${carData.mileage}`,
			);
		});
	});

	it('Update Car Mileage', () => {
		cy.api({
			method: 'GET',
			url: '/api/cars',
			headers: {
				Cookie: `sid=${sidValueGlobal}`,
			},
		}).then((response) => {
			expect(response.status).to.eq(200);
			const carId = response.body.data[0].id;
			const currentMileage = response.body.data[0].mileage;
			const newMileage = currentMileage + 500;

			cy.api({
				method: 'PUT',
				url: `/api/cars/${carId}`,
				headers: {
					Cookie: `sid=${sidValueGlobal}`,
				},
				body: { mileage: newMileage },
			}).then((updateResponse) => {
				expect(updateResponse.status).to.eq(200);
				expect(updateResponse.body.data.mileage).to.eq(newMileage);
				cy.log(
					`Updated Car Mileage to: ${updateResponse.body.data.mileage}`,
				);
			});
		});
	});

	it('Get Specific Car', () => {
		const carId = carsIds[0].id;

		cy.api({
			method: 'GET',
			url: `/api/cars/${carId}`,
			headers: {
				Cookie: `sid=${sidValueGlobal}`,
			},
		}).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.data).to.have.property('id', carId);
			expect(response.body.data).to.have.property('mileage');
			expect(response.body.data).to.have.property('brand');
			expect(response.body.data).to.have.property('model');
			cy.log(
				`Retrieved Car Info: ${JSON.stringify(response.body.data)}`,
			);
		});
	});

	it('Delete a Specific Car', () => {
		const carId = carsIds[0].id;

		cy.api({
			method: 'DELETE',
			url: `/api/cars/${carId}`,
			headers: {
				Cookie: `sid=${sidValueGlobal}`,
			},
		}).then((response) => {
			expect(response.status).to.eq(200);
			cy.log(`Deleted Car ID: ${carId}`);

			cy.api({
				method: 'GET',
				url: `/api/cars/${carId}`,
				headers: {
					Cookie: `sid=${sidValueGlobal}`,
				},
				failOnStatusCode: false,
			}).then((verifyResponse) => {
				expect(verifyResponse.status).to.eq(404);
				cy.log('Car successfully deleted.');
			});
		});
	});
});
