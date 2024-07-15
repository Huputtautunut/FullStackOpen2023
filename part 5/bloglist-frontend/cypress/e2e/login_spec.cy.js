describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/testing/reset') // Empty the database
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user) // Create a new user
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').should('be.visible')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
  
        cy.contains('Test User logged in')
        cy.contains('logout').should('be.visible')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
  
        cy.get('.error')
          .should('contain', 'Wrong username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })
  