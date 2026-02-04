/// <reference types="cypress" />


describe('register test', () => {
    it('open the register page', ()=>{
        cy.visit('http://localhost:4200')
    })


    it('Test functions', ()=>{
        cy.visit('http://localhost:4200')


        cy.get('input[formControlName="name"').type('Cypress')
        cy.get('input[formControlName="email"]').type('test@gmail.com')
        cy.get('input[formControlName="phone"]').type('123456')
        cy.get('input[formControlName="date"').type('01.01.2001.')
        

        cy.wait(2000)
        cy.contains('button', 'Register').click()


        cy.wait(2000)
        cy.url().should('include', '/login')
    })
    it('Login test',()=>{
        cy.visit('http://localhost:4200/login')

        cy.get('input[formControlName="email"').type('test@gmail.com')
        cy.get('input[formControlName="phone"').type('123456')

        cy.wait(2000)
        cy.contains('button','Login').click()

        cy.wait(2000)
        cy.url().should('include','/home')

        cy.contains('Welcome Cypress',{timeout: 10000})

    })

})