import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search';

class Admin extends React.Component {

  state = {
    books: {},
    searchBooks: {},
    search: '',
    booksFiltered: {},
  }

  // addToCart = id => {
  //   this.setState(prevState => {
  //     const cart = {...prevState.cart}
  //     cart[id] = this.state.books[id];
  //     return { cart: {...cart} }
  //   })
  // }

  // removeFromCart = id => {
  //   this.setState(prevState => {
  //     const cart = {...prevState.cart}
  //     delete cart[id];
  //     return { cart: {...cart} }
  //   })
  // }

  removeBook = id => {

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
          console.log(json)
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
      </div>
    );
  }

}

export default Admin;
