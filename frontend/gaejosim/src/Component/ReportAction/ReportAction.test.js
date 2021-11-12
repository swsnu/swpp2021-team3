import React from 'react';
import {shallow} from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ReportAction from './ReportAction';
import SearchPage from '../../Page/SearchPage'

describe('<ReportAction />', () => {
    it('should render without errors', () => {
      const component = shallow(<ReportAction />);
      const wrapper = component.find('.ReportAction');
      expect(wrapper.length).toBe(1);
    });
});

// describe('router to search page', () => {
//   test('router to search page : submit', () => {
//     const history = createMemoryHistory({ initialEntries: ['/ReportAction/i'] });
//     const { getByText } = render(
//       <Router history={history}>
//         <SearchPage />
//       </Router>
//     );
//     expect(history.location.pathname).toBe('/ReportAction/i');
//     fireEvent.click(getByText('Peports'));
//     expect(history.location.pathname).toBe('/');
//   });
// }); ????

