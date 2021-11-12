import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {shallow} from 'enzyme';

import ReportAuth from './ReportAuth';
import ReportActionPage from '../../Page/ReportActionPage'


describe('<ReportAuth />', () => {
    it('should render without errors', () => {
      const component = shallow(<ReportAuth />);
      const wrapper = component.find('.ReportAuth');
      expect(wrapper.length).toBe(1);
    });

});

// describe('router reportaction page', () => {
//   test('should pass', () => {
//     const history = createMemoryHistory({ initialEntries: ['/reportAuth/i'] });
//     const { getByText } = render(
//       <Router history={history}>
//         <ReportActionPage />
//       </Router>
//     );
//     expect(history.location.pathname).toBe('/');
//     fireEvent.click(getByText('Report'));
//     expect(history.location.pathname).toBe('/ReportAction/i');
//   });
// }); ???

//clicknextbutton true/false
// input reported summoner
// route to the next link
// axios
