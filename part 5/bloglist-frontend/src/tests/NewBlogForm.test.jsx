import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlogForm from '../components/NewBlogForm';

test('calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(<NewBlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector('input[name="title"]');
  const authorInput = component.container.querySelector('input[name="author"]');
  const urlInput = component.container.querySelector('input[name="url"]');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'Testing the Blog Form' }
  });
  fireEvent.change(authorInput, {
    target: { value: 'Author Tester' }
  });
  fireEvent.change(urlInput, {
    target: { value: 'http://testblogform.com' }
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing the Blog Form',
    author: 'Author Tester',
    url: 'http://testblogform.com',
  });
});
