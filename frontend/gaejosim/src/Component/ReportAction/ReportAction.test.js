import React from 'react';
import {shallow} from 'enzyme';
import ReportAction from './ReportAction';

describe('<ReportAction />', () => {
    it('should render without errors', () => {
      const component = shallow(<ReportAction />);
      const wrapper = component.find('.ReportAction');
      expect(wrapper.length).toBe(1);
    });
});