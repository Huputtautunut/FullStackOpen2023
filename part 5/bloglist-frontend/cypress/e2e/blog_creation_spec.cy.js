describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('apiUrl')}/api/testing/reset`)
  
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
      }
      cy.request('POST', `${Cypress.env('apiUrl')}/api/users`, user)
      cy.visit('/')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()
  
        cy.contains('Test User logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
  
        cy.contains('Wrong username or password')
      })
    })
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('A new blog')
        cy.get('#author').type('John Doe')
        cy.get('#url').type('http://anewblog.com')
        cy.get('#create-blog-button').click()
        cy.contains('A new blog John Doe')
      })
  
      it('A blog can be liked', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('A new blog')
        cy.get('#author').type('John Doe')
        cy.get('#url').type('http://anewblog.com')
        cy.get('#create-blog-button').click()
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })
  
      it('A blog can be deleted by the creator', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('A new blog')
        cy.get('#author').type('John Doe')
        cy.get('#url').type('http://anewblog.com')
        cy.get('#create-blog-button').click()
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.on('window:confirm', () => true)
        cy.contains('A new blog John Doe').should('not.exist')
      })
  
      it('Blogs are ordered by likes', function() {
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
  
        cy.visit('/')
  
        cy.get('.blog').then(blogs => {
          const likes = []
          blogs.each((index, blog) => {
            likes.push(parseInt(Cypress.$(blog).find('.likes').text()))
          })
  
          for (let i = 0; i < likes.length - 1; i++) {
            expect(likes[i]).to.be.at.least(likes[i + 1])
          }
        })
      })
    })
  })
  