import React from 'react'
import NavBar from './NavBar'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'


describe(`<NavBar />`, () => {
  //Snapshot Testing w/ Enzyme
  it('renders UI as expected', () => {
    const wrapper = shallow(<NavBar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})