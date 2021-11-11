import React from 'react';
import {shallow} from 'enzyme';
import CommonSearch from './CommonSearch';

describe('<CommonSearch />', () => {
    it('should render without errors', () => {
      const component = shallow(<CommonSearch />);
      const wrapper = component.find('.CommonSearch');
      expect(wrapper.length).toBe(1);
    });
});