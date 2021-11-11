import React from 'react';
import {shallow} from 'enzyme';
import Statistic from './Statistic';

describe('<Statistic />', () => {
    it('should render without errors', () => {
      const component = shallow(<Statistic />);
      const wrapper = component.find('.Statistic');
      expect(wrapper.length).toBe(1);
    });
});