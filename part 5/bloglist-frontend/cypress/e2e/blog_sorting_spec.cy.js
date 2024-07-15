describe('Blog app', function() {
    beforeEach(function() {
      // Reset the database
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
  
      // Create a user
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
      }
      cy.request('POST', 'http://localhost:3000/api/users', user)
  
      // Log in the user
      cy.visit('http://localhost:5173')
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
  
      // Create multiple blogs with different numbers of likes
      cy.createBlog({
        title: 'First Blog',
        author: 'Author One',
        url: 'http://firstblog.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://secondblog.com',
        likes: 3
      })
      cy.createBlog({
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://thirdblog.com',
        likes: 2
      })
    })
  
    it('Blogs are ordered by likes, with the most liked blog being first', function() {
      cy.visit('http://localhost:5173')
  
      // Expand all blogs to ensure likes are visible
      cy.contains('First Blog').parent().contains('view').click()
      cy.contains('Second Blog').parent().contains('view').click()
      cy.contains('Third Blog').parent().contains('view').click()
  
      // Get all blog elements and extract their like counts
      cy.get('.blog').then(blogs => {
        const likes = []
        blogs.each((index, blog) => {
          likes.push(parseInt(Cypress.$(blog).find('.likes').text()))
        })
  
        // Verify the likes are in descending order
        for (let i = 0; i < likes.length - 1; i++) {
          expect(likes[i]).to.be.at.least(likes[i + 1])
        }
      })
    })
  })
  