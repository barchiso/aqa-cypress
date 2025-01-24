// Task 1:
// Write at least 5 of any test APIs on one of the pages of the site
// (Garage, Fuel Expenses, Instructions, User Sign Up/Sign In).
// Tests should make GET/POST/PUT/DELETE requests and check the response

/// <reference types="cypress" />
import data from '../../fixtures/credentials.json';
import carBrands from '../../fixtures/brands.json';
import carModels from '../../fixtures/models.json';

describe('Test Cars', () => {
	let sidValueGlobal;
	let carsIds = [];
	let carsInfo = {};

	before(() => {
		const userBody = {
			email: data.email,
			password: data.password,
			remember: data.remember,
		};
		cy.request('POST', '/api/auth/signin', userBody).then((response) => {
			const sidCookie = response.headers['set-cookie'][0];
			const sidValue = sidCookie.split(';')[0].split('=')[1];
			sidValueGlobal = sidValue;
			cy.log(sidValueGlobal);
		});
	});

	describe('Add New Cars', () => {
		const carsToAdd = [
			{ brandIndex: 0, modelIndex: 4, mileage: 9999 },
			{ brandIndex: 2, modelIndex: 14, mileage: 10000 },
			{ brandIndex: 4, modelIndex: 22, mileage: 15000 },
		];

		carsToAdd.forEach((car, index) => {
			it(`Add car ${index + 1}`, () => {
				const { brandIndex, modelIndex, mileage } = car;

				cy.request({
					method: 'POST',
					url: '/api/cars',
					body: {
						carBrandId: carBrands.data[brandIndex].id,
						carModelId: carModels.data[modelIndex].id,
						mileage,
					},
					headers: {
						Cookie: `sid=${sidValueGlobal}`,
					},
				}).then((response) => {
					expect(response.status).to.eq(201);

					const carData = response.body.data;
					const { id, brand, model } = carData;

					carsIds.push(id);
					carsInfo[id] = { brand, model, mileage };

					expect(brand).to.eq(carBrands.data[brandIndex].title);
					expect(model).to.eq(carModels.data[modelIndex].title);
					expect(carData.mileage).to.eq(mileage);

					cy.log(
						`Added car: ID=${id}, Brand=${brand}, Model=${model}, Mileage=${mileage}`,
					);
				});
			});
		});
	});

	describe('Get All User Cars List', () => {
		it('Retrieve and validate user cars', () => {
			cy.request({
				method: 'GET',
				url: '/api/cars',
				headers: {
					Cookie: `sid=${sidValueGlobal}`,
				},
			}).then((response) => {
				expect(response.status).to.eq(200);

				const cars = response.body.data;
				cy.wrap(cars.length).should('be.gte', 3);

				cars.forEach((car) => {
					const { id, brand, model, mileage } = car;
					expect(car).to.have.property('brand').and.be.a('string')
						.and.not.be.empty;
					expect(car).to.have.property('model').and.be.a('string')
						.and.not.be.empty;
					expect(car)
						.to.have.property('mileage')
						.and.be.a('number')
						.and.be.gte(0);

					if (!carsIds.includes(id)) {
						carsIds.push(id);
						carsInfo[id] = { brand, model, mileage };
					}

					cy.log(
						`Car: ID=${id}, Brand=${brand}, Model=${model}, Mileage=${mileage}`,
					);
				});
			});
		});
	});

	describe('Update Cars', () => {
		it('Update mileage for each car', () => {
			carsIds.forEach((id) => {
				const updatedMileage = carsInfo[id].mileage + 100;

				cy.request({
					method: 'PUT',
					url: `/api/cars/${id}`,
					body: { mileage: updatedMileage },
					headers: {
						Cookie: `sid=${sidValueGlobal}`,
					},
				}).then((response) => {
					expect(response.status).to.eq(200);

					carsInfo[id].mileage = updatedMileage;
					expect(response.body.data.mileage).to.eq(updatedMileage);

					cy.log(
						`Updated car ID=${id}, New Mileage=${updatedMileage}`,
					);
				});
			});
		});
	});

	describe('Get Last Car Info', () => {
		it('Get last added car information', () => {
			const lastCarId = carsIds[carsIds.length - 1];

			cy.request({
				method: 'GET',
				url: `/api/cars/${lastCarId}`,
				headers: {
					Cookie: `sid=${sidValueGlobal}`,
				},
			}).then((response) => {
				expect(response.status).to.eq(200);

				const carData = response.body.data;
				const expectedCar = carsInfo[lastCarId];

				expect(carData.id).to.eq(lastCarId);
				expect(carData.brand).to.eq(expectedCar.brand);
				expect(carData.model).to.eq(expectedCar.model);
				expect(carData.mileage).to.eq(expectedCar.mileage);

				cy.log(
					`Validated car: ID=${carData.id}, Brand=${carData.brand}, Model=${carData.model}, Mileage=${carData.mileage}`,
				);
			});
		});
	});

	describe('Delete All Cars', () => {
		it('Delete all cars from the list', () => {
			carsIds.forEach((id) => {
				cy.request({
					method: 'DELETE',
					url: `/api/cars/${id}`,
					headers: {
						Cookie: `sid=${sidValueGlobal}`,
					},
				}).then((response) => {
					expect(response.status).to.eq(200);
					cy.log(`Deleted car with ID: ${id}`);
				});
			});
		});

		it('Verify all cars are deleted', () => {
			cy.request({
				method: 'GET',
				url: '/api/cars',
				headers: {
					Cookie: `sid=${sidValueGlobal}`,
				},
			}).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.data).to.be.empty;
				cy.log('All cars successfully deleted.');
			});
		});
	});
});
