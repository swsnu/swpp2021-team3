import React from 'react';
import {shallow} from 'enzyme';
import User from './User';

describe('<User />', () => {
    it('should render without errors', () => {
      const component = shallow(<User />);
      const wrapper = component.find('.User');
      expect(wrapper.length).toBe(1);
    });
});