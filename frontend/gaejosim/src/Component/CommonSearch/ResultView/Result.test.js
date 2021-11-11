import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';

describe('<Result />', () => {
    it('should render without errors', () => {
      const component = shallow(<Result />);
      const wrapper = component.find('.Result');
      expect(wrapper.length).toBe(1);
    });

    it('should render champion', () => {
      const component = shallow(<Result champion={'TEST_CHAMPION'} />);
      const wrapper = component.find('.champion');
      expect(wrapper.text()).toEqual('TEST_CHAMPION');
    });

    it('should render lane', () => {
      const component = shallow(<Result champion={'TEST_LANE'} />);
      const wrapper = component.find('.lane');
      expect(wrapper.text()).toEqual('TEST_LANE');
    });
});