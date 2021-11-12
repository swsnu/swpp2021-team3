import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';

describe('<Result />', () => {
    it('should render without errors', () => {
      const component = shallow(<Result />);
      const wrapper = component.find('.Result');
      expect(wrapper.length).toBe(1);
    });


});