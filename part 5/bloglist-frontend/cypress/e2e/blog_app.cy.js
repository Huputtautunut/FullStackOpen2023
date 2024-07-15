describe('Blog app', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').should('be.visible') // Assumes your login form contains the text 'login'
    })
  })
  