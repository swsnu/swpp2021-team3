import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {shallow} from 'enzyme';
import Searchbar from './Searchbar';
import SearchPage from '../../Page/SearchPage';
// import MyPage from '../../Page/MyPage';

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

describe('router search page', () => {
  test('should pass', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getAllByText } = render(
      <Router history={history}>
        <SearchPage />
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getAllByText('Search')[1]);
    expect(history.location.pathname).toBe('/search');
  });
});
