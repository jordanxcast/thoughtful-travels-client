import React from 'react'
import ReactDOM from 'react-dom'
import Entry from './Entry'
import renderer from 'react-test-renderer';


describe(`<Entry />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Entry 
  
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<Entry />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})