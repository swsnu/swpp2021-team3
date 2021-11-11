import React from 'react';
import {shallow} from 'enzyme';
import ReportAuth from './ReportAuth';

describe('<ReportAuth />', () => {
    it('should render without errors', () => {
      const component = shallow(<ReportAuth />);
      const wrapper = component.find('.ReportAuth');
      expect(wrapper.length).toBe(1);
    });
});