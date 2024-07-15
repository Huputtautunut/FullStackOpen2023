describe('Blog app', function() {
    beforeEach(function() {
      // Reset the database
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
  
      // Create a new user
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user)
  
      // Visit the application
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').should('be.visible')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('testpassword')
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
  
    describe('When logged in', function() {
      beforeEach(function() {
        // Log in the user
        cy.get('#username').type('testuser')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()
  
        // Ensure the user is logged in
        cy.contains('Test User logged in')
  
        // Create a new blog
        cy.contains('create new blog').click()
        cy.get('#title').type('New Blog Title')
        cy.get('#author').type('New Blog Author')
        cy.get('#url').type('http://newblogurl.com')
        cy.get('#create-blog-button').click()
  
        // Ensure the new blog is created
        cy.contains('New Blog Title')
      })
  
      it('A blog can be liked', function() {
        // Expand the blog details
        cy.contains('New Blog Title').parent().contains('view').click()
  
        // Ensure the blog details are shown
        cy.contains('URL: http://newblogurl.com')
        cy.contains('Likes: 0')
  
        // Like the blog
        cy.contains('New Blog Title').parent().contains('like').click()
  
        // Ensure the number of likes has increased
        cy.contains('Likes: 1')
      })
    })
  })
  