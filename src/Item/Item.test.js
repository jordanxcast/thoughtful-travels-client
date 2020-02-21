import React from 'react'
import ReactDOM from 'react-dom'
import Item from './Item'
import renderer from 'react-test-renderer';


describe(`<Item />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Item 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<Item />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})