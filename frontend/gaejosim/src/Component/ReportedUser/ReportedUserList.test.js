import React from 'react';
import {shallow} from 'enzyme';
import ReportedUserList from './ReportedUserList';

describe('<ReportedUserList />', () => {
    it('should render without errors', () => {
      const component = shallow(<ReportedUserList />);
      const wrapper = component.find('.ReportedUserList');
      expect(wrapper.length).toBe(1);
    });
});