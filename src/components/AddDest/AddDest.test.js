import React from 'react'
import ReactDOM from 'react-dom'
import AddDest from './AddDest'
import renderer from 'react-test-renderer';


describe(`<AddDest />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddDest />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<AddDest />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})