import React from 'react';
import {shallow} from 'enzyme';
import Searchbar from './Searchbar';

describe('<Searchbar />', () => {
    it('should render without errors', () => {
      const component = shallow(<Searchbar />);
      const wrapper = component.find('.Searchbar');
      expect(wrapper.length).toBe(1);
    });

    it('should handle search button', () => {
      const mockSearchButton = jest.fn();
      const component = shallow(<Searchbar clickDone={mockSearchButton} />);
      const wrapper = component.find('.search');
      wrapper.simulate('click');
      expect(mockSearchButton).toHaveBeenCalledTimes(0);
    });

    it('should handle single or multi button', () => {
      const mockSingleOrMultiButton = jest.fn();
      const component = shallow(<Searchbar clickDone={mockSingleOrMultiButton} />);
      const wrapper = component.find('.singleormulti');
      wrapper.simulate('click');
      expect(mockSingleOrMultiButton).toHaveBeenCalledTimes(0);
    });
});