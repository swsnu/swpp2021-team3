import React from 'react';
import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import SingleSearchResultPage from './SingleSearchResultPage';

test('renders SingleSearchResult page', () => {
  render(<SingleSearchResultPage />);
  const linkElement = screen.getByText(/SingleSearchResultPage/);
  expect(linkElement).toBeInTheDocument();
});

describe('<SingleSearchResultPage />', () => {
  it('should handle single or multi button', () => {
    const mockMoreMatchButton = jest.fn();
    const component = shallow(<SingleSearchResultPage clickDone={mockMoreMatchButton} />);
    const wrapper = component.find('.matchMoreButton');
    wrapper.simulate('click');
    expect(mockMoreMatchButton).toHaveBeenCalledTimes(0);
  });
});