import React from 'react'
import ReactDOM from 'react-dom'
import AddItem from './AddItem'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'


describe(`<AddItem />`, () => {
  //Snapshot Testing
  it('renders UI as expected', () => {
    const wrapper = shallow(<AddItem 
      match={{params: {id: 1}}}
    />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})