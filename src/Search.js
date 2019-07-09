import React from 'react';
import del from './del.png';
import plus from './plus.png';


class Search extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.childNodes)
  }

  render() {
    let bookList;
    let icon = this.props.admin ? del : plus;
    if (this.props.search === '') {
      bookList = Object.keys(this.props.books).map(key => {
        const books = this.props.books;
        return (
          <tr key={key}>
            <td>{books[key].title}</td>
            <td>{books[key].author}</td>
            <td>${books[key].price}</td>
            <td><img className='icon' alt='icon' onClick={() => this.props.addBook(key)} src={icon} /></td>
          </tr>
        )
      })
    } else {
      bookList = Object.keys(this.props.filtered).map(key => {
        const books = this.props.books;
        return (
          <tr key={key}>
            <td>{books[key].title}</td>
            <td>{books[key].author}</td>
            <td>${books[key].price}</td>
            <td><img className='icon' alt='icon' onClick={() => this.props.addBook(key)} src={icon} /></td>
          </tr>
        )
      })
    }

    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>

          <input onChange={e => this.props.updateSearch(e.target.value)} type="text" name="search" placeholder="Search..."></input>
          <table className="highlight">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Item Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookList}
            </tbody>
          </table>
        </form>
      </div>
    );
  }

}

export default Search;
