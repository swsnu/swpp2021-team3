import React from 'react';
import {shallow} from 'enzyme';
import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
    it('should render without errors', () => {
      const component = shallow(<SearchPage />);
      const wrapper = component.find('.SearchPage');
      expect(wrapper.length).toBe(1);
    });

});