import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';
import ReactDOM from 'react-dom';

describe('<Result />', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Result />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});