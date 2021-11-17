import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('should render without errors', () => {
    const component = shallow(<App />);
    const wrapper = component.find('.App')
    expect(wrapper.length).toBe(1);
  });

  //TODO: 404 message test code
});
