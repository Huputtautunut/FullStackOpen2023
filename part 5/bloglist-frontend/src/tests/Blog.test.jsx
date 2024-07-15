import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the custom matchers
import Blog from '../components/Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  };

  const mockUpdateBlog = jest.fn();

  beforeEach(() => {
    component = render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);
  });

  test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    expect(component.container).toHaveTextContent('Test Blog Title');
    expect(component.container).toHaveTextContent('Test Author');
    expect(component.container).not.toHaveTextContent('http://example.com');
    expect(component.container).not.toHaveTextContent('5');
  });

  test('renders the blog\'s URL and number of likes when the details button is clicked', () => {
    const button = component.getByText('Show Details');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('http://example.com');
    expect(component.container).toHaveTextContent('5');
  });

  test('calls the like event handler twice when the like button is clicked twice', () => {
    const button = component.getByText('Show Details');
    fireEvent.click(button);

    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});
