import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import Item from '../Item/Item'
import Entry from '../Entry/Entry'
import './DestMainPage.css'

class DestMainPage extends Component {
  static contextType = ApiContext;

  //grab this value this.props.match.params.destId and send to the get fetch request 
  componentDidMount() {
    const destId = this.props.match.params.destId;
    this.context.getItems(destId);
    this.context.getEntries(destId);
  }
  render() {
    const { destinations, items, entries } = this.context;

    console.log('Context in page view:', items)
    return (
      <>
        <section className='DestMainPage-overview'>
          <h1>{destinations.dest_title} </h1>
          {destinations.goal_date}
          {destinations.budget}
        </section>
        <section className='DestMainPage-items'>
          {items.map(item => {
            return <Item 
              key={item.item_id}
              id={item.item_id}
              content={item.item_content}
            />
          })}
          <button type='button'>+ Add Item</button>
        </section>
        <section className='DestMainPage-entries'>
          {entries.map(entry => {
            return <Entry 
              key={entry.id}
              id={entry.id}
              subject={entry.subject}
              body={entry.body}
              created={entry.date_created}
            />
          })}
        </section>
      </>

    )
  }
}

export default DestMainPage;