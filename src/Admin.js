import React from 'react'
import Search from './Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Admin extends React.Component {

  state = {
    books: {},
    searchBooks: {},
    search: '',
    booksFiltered: {},
  }

  notify = (title, action) => {
    toast(`${title} was ${action}.`, {
      autoClose: 2000,
      className: 'black-background',
      bodyClassName: "grow-font-size",
      progressClassName: 'fancy-progress-bar'
    });
  }

  removeBook = bid => {
    const id = this.state.books[bid].id
    const url = `http://localhost:8082/api/books/${id}`
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => { res.json()})
    .then(json => {
      this.notify(this.state.books[bid].title, 'removed')
      this.componentDidMount()
    })
  }

  updateSearch = input => {
    const str = input.toLowerCase();
    const filtered = {};
    Object.keys(this.state.books).forEach(key => {
      if (this.state.searchBooks[key].title.includes(str)) {
        filtered[key] = this.state.books[key]
      }
      if (this.state.searchBooks[key].author.includes(str)) {
        filtered[key] = this.state.books[key]
      }
    })
    this.setState({ 
      search: str,
      booksFiltered: filtered
    })
  }

  componentDidMount() {
    fetch('http://localhost:8082/api/books')
      .then(res => res.json())
      .then(json => {
        this.setState(() => {
          const cart = {};
          const filtered = {};
          Object.keys(json).forEach(key => {
            if (json[key].inCart) {
              cart[key] = json[key];
            }
            filtered[key] = {...json[key]};
            filtered[key].title = filtered[key].title.toLowerCase()
            filtered[key].author = filtered[key].author.toLowerCase()
          })
          return { 
            cart: cart,
            books: {...json},
            searchBooks: filtered
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Search books={this.state.books} addBook={this.removeBook} updateSearch={this.updateSearch} search={this.state.search} filtered={this.state.booksFiltered} admin={true} />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </div>
    );
  }

}

export default Admin;
