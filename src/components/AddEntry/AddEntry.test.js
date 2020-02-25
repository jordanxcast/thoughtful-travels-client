import React from 'react'
import ReactDOM from 'react-dom'
import AddEntry from './AddEntry'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AddEntry />`, () => {
  //Snapshot Testing
  it('renders UI as expected', () => {
    const wrapper = shallow(<AddEntry
      match={{params: {id: 1}}}
    />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})