import React from 'react';
import {shallow} from 'enzyme';
import Statistic from './Statistic';
import {render, screen} from '@testing-library/react';

describe('<Statistic />', () => {
    it('should render without errors', () => {
      const component = shallow(<Statistic />);
      const wrapper = component.find('.Statistic');
      expect(wrapper.length).toBe(1);
    });

  //   it('should render states without errors.', () => {
  //     const wrapper = shallow(<Statistic />);
  //     expect(wrapper.find('#numReports').length).toEqual(1);
  // });
});

test('renders Statistic page', () => {
  render(<Statistic />);
  const linkElement = screen.getByText(/Reports/);
  expect(linkElement).toBeInTheDocument();
});