import React from 'react';
import {shallow} from 'enzyme';
import Searchbar from './Searchbar';

describe('<Searchbar />', () => {
    it('should render without errors', () => {
      const component = shallow(<Searchbar />);
      const wrapper = component.find('.Searchbar');
      expect(wrapper.length).toBe(1);
    });
});