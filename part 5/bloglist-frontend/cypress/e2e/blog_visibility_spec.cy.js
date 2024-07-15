describe('Blog app', function() {
    beforeEach(function() {
      // Reset the database
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
  
      // Create two users
      const user1 = {
        username: 'creator',
        name: 'Blog Creator',
        password: 'creatorpassword'
      }
      const user2 = {
        username: 'otheruser',
        name: 'Other User',
        password: 'otherpassword'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user1)
      cy.request('POST', 'http://localhost:3000/api/users', user2)
  
      // Visit the application
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').should('be.visible')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('creator')
        cy.get('#password').type('creatorpassword')
        cy.get('#login-button').click()
  
        cy.contains('Blog Creator logged in')
        cy.contains('logout').should('be.visible')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('creator')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
  
        cy.get('.error')
          .should('contain', 'Wrong username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  
    describe('When logged in', function() {
      beforeEach(function() {
        // Log in as the creator
        cy.get('#username').type('creator')
        cy.get('#password').type('creatorpassword')
        cy.get('#login-button').click()
  
        // Ensure the user is logged in
        cy.contains('Blog Creator logged in')
  
        // Create a new blog
        cy.contains('create new blog').click()
        cy.get('#title').type('New Blog Title')
        cy.get('#author').type('New Blog Author')
        cy.get('#url').type('http://newblogurl.com')
        cy.get('#create-blog-button').click()
  
        // Ensure the new blog is created
        cy.contains('New Blog Title')
      })
  
      it('A blog can be created', function() {
        // Verify the blog is created
        cy.contains('New Blog Title')
          .contains('view')
          .click()
  
        cy.contains('URL: http://newblogurl.com')
        cy.contains('Likes: 0')
      })
  
      it('Only the creator can see the delete button', function() {
        // Ensure the creator can see the delete button
        cy.contains('New Blog Title').parent().contains('view').click()
        cy.contains('delete').should('be.visible')
  
        // Log out the creator
        cy.contains('logout').click()
  
        // Log in as another user
        cy.get('#username').type('otheruser')
        cy.get('#password').type('otherpassword')
        cy.get('#login-button').click()
  
        // Ensure the other user cannot see the delete button
        cy.contains('New Blog Title').parent().contains('view').click()
        cy.contains('delete').should('not.exist')
      })
    })
  })
  