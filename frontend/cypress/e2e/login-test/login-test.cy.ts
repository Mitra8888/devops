/// <reference types="cypress" />


describe('login test', () => {
    it('open the login page', ()=>{
        cy.visit('http://localhost:4200')
    })

    it('Test functions', ()=>{
        cy.visit('http://localhost:4200')

        cy.get('input[formControlName="email"]').type('e2etest@gmail.com')
        cy.get('input[formControlName="phone"]').type('123456')

        cy.wait(2000)
        cy.contains('button', 'Login').click()

         cy.url().then(url => {
        cy.log("Current URL: " + url)
        })

        cy.url().should('include','home',{ timeout: 10000 })
        cy.contains('Welcome Cypress')

        cy.contains('button','LogOut').click()

        cy.url().should('include','login',{ timeout: 10000 })
        cy.contains('Login')
    })


})