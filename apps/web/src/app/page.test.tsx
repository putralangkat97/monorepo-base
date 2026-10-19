import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import Home from './page';

test('renders the sum on the home page', () => {
  render(<Home />);

  expect(screen.getByText('Sum 1 + 2 = 3')).toBeDefined();
});
