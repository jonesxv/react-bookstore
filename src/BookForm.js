import React from 'react'
import { Redirect } from 'react-router-dom';

class BookForm extends React.Component {
  state = {
    redirect: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:8082/api/books'
    const book = {
      title: e.target.title.value,
      author: e.target.author.value,
      pages: parseInt(e.target.pages.value),
      subtitle: e.target.subtitle.value,
      description: e.target.description.value,
      price: parseInt(e.target.price.value)
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book)
    })
    .then(res => { res.json()})
    .then(json => {
      console.log(json)
      this.setState({redirect: true})
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin"/>
    } else {
      
    }
    return (
      <div class="book-form">
        <form class="col s12" onSubmit={e => this.handleSubmit(e)}>
          <div class="row">
            <div class="input-field col s6">
              <input name="title" placeholder="Title" type="text"></input>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="author" placeholder="Author" type="text"></input>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="subtitle" placeholder="Subtitle" type="text"></input>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="pages" placeholder="Pages" type="number"></input>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="price" placeholder="Price" type="number"></input>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea placeholder="Description" id="description" class="materialize-textarea" length="120"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <input className="btn" type="submit"></input>
            </div>
          </div>
          
        </form>
      </div>
    );
  }
}

export default BookForm;