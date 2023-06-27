
// @ts-check
//const { test, expect } = require('@playwright/test');
//import { test, expect } from '@playwright/test';

// node ./tests/auth.tests.spec.js
/* 
 import {
  BASE_URL, 
  login_URL,
  testUserName, 
  testLastName,
  password,
} from '../configs/config.js'
 

import {
    dateTime
  } from '../controllers/controller.js'
   */

/* 
const  randomName  = require('../controllers/controller.js')
//import { randomName } from '../controllers/controller.js'
console.log(randomName);
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { test, expect } = require('@playwright/test');


const { faker } = require('@faker-js/faker');
const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomFirstName = faker.person.firstName(); // 'Antwan'
const randomLastName = faker.person.lastName() // 'Hauck'
const randomNickName = faker.person.zodiacSign() // 'Pisces'
//console.log(randomName)


const BASE_URL = 'https://www.automationexercise.com'
const login_URL = 'https://www.automationexercise.com/login'

// (not yet) Already existed user
const testUserName = 'Auto_Guliver'
const testFirstName = 'Auto_Alfred'
const testLastName = 'Auto_Daniels'
const password = 'AAss22##'




/* 
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});
 */


test('should open the login page', async ({ page }) => {
  await page.goto(login_URL);
  
  await expect(page).toHaveTitle(/Signup/);
  await expect(page).toHaveTitle(/Login/);
});


test('page has registration fields and buttons', async ({ page }) => {
  await page.goto(login_URL); 

  const emailLogin = await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
  await expect(emailLogin).toBeVisible();

  const password = await page.getByPlaceholder('Password');
  await expect(password).toBeVisible();
 
  const button = await page.getByRole('button', { name: 'Login' });
  await expect(button).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});


test('page has signing fields and buttons', async ({ page }) => {
  await page.goto(login_URL); 

  const name = await page.getByPlaceholder('Name');
  await expect(name).toBeVisible();
 
  const emailSignUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
  await expect(emailSignUp).toBeVisible();
  
  const button = await page.getByRole('button', { name: 'Signup' });
  await expect(button).toBeVisible();
});


test('user can go to registration page after filling singIn form', async ({ page }) => {
  await page.goto(login_URL);
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill(randomNickName);
  await page.getByPlaceholder('Name').press('Tab');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();
  
  const zipCode = await page.getByLabel('Zipcode *');
  await expect(zipCode).toBeVisible();
});


test('user can register a new account', async ({ page }) => {
  await page.goto(login_URL);
  await page.getByPlaceholder('Name').fill(randomNickName);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();
  
  await page.getByLabel('Password *').fill('AAss22$$@');
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('2');
  await page.locator('#years').selectOption('2019');

  await page.getByLabel('First name *').fill(randomFirstName);
  await page.getByLabel('Last name *').fill(randomLastName);

  await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill('some address 123123$4^:;');
  await page.getByRole('combobox', { name: 'Country *' }).selectOption('Canada');
  await page.getByLabel('City *').fill('Toronto');
  await page.getByLabel('State *').fill('Somestate');
  await page.locator('#zipcode').fill('09090909');
  await page.getByLabel('Mobile Number *').fill('123123123123');

  await page.getByRole('button', { name: 'Create Account' }).click();

  const message1 = await page.getByText('Account Created!');
  await expect(message1).toBeVisible();
  const message2 = await page.getByText('Congratulations! Your new account has been successfully created!');
  await expect(message2).toBeVisible();
});
