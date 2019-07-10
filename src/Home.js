import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Search from './Search';
import Checkout from './Checkout';

class Home extends React.Component {

  state = {
    books: {},
    searchBooks: {},
    cart: {},
    search: '',
    booksFiltered: {},
    rendered: true
  }

  notify = (title, action) => {
    toast(`${title} was ${action}.`, {
      autoClose: 2000,
      className: 'black-background',
      bodyClassName: "grow-font-size",
      progressClassName: 'fancy-progress-bar'
    });
  }

  addToCart = bid => {
    const id = this.state.books[bid].id
    const url = `http://localhost:8082/api/books/cart/add/${id}`
    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => { res.json()})
    .then(json => {
      this.notify(this.state.books[bid].title, 'added to cart')
      this.componentDidMount();
    })
  }

  removeFromCart = bid => {
    const id = this.state.books[bid].id
    const url = `http://localhost:8082/api/books/cart/remove/${id}`
    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => { res.json()})
    .then(json => {
      this.componentDidMount();
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
    this.setState({rendered: false})
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
            searchBooks: filtered,
            rendered: true
          }
        })
      })
  }

  render() { 
    return (
      <div className="App">
        <Search books={this.state.books} addBook={this.addToCart} updateSearch={this.updateSearch} search={this.state.search} filtered={this.state.booksFiltered} admin={false} />
        <Checkout cart={this.state.cart} removeBook={this.removeFromCart} />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </div>
    );
  }

}

export default Home;
