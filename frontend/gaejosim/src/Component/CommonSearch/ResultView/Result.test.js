import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';
import ReactDOM from 'react-dom';

describe('<Result />', () => {

    it('renders without crashing', () => {
      let champion_id = 0;
      const div = document.createElement('div');
      ReactDOM.render(<Result />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});