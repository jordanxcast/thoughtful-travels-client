import React from 'react'
// import ReactDOM from 'react-dom'
import DestListPage from './DestListPage'
// import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ApiContext from '../ApiContext'

describe.only(`<DestListPage />`, () => {
  //Snapshot Testing
  it('renders UI as expected', () => {

    const wrapper = shallow(<DestListPage/>, {context: 
      {
        destinations: [
          {
            'dest_id': '35',
            'dest_title': 'London',
            'completed': 'false',
          },
          {
            'dest_id': '36',
            'dest_title': 'Paris',
            'completed': 'false',
          },
          {
            'dest_id': '37',
            'dest_title': 'Barcelona',
            'completed': 'false',
          },
        ]
      }
    })
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})