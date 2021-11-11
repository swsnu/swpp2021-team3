import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
    it('should render without errors', () => {
      const component = shallow(<Header />);
      const wrapper = component.find('.Header');
      expect(wrapper.length).toBe(1);
    });
});