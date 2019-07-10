import React from 'react';


class Search extends React.Component {

  render() {
    let bookList;
    if (this.props.search === '') {
      bookList = Object.keys(this.props.books).map(key => {
        const books = this.props.books;
        return (
          <div key={`card${key}`} className="col s6">
            <div className="card">
              <div className="card-image">
                <a targer="blank" href={books[key].website}><img alt="book" src={`https://source.unsplash.com/350x200/?${books[key].title}`} /></a>
                <button onClick={() => this.props.addBook(key)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">{this.props.admin ? 'delete' : 'add'}</i></button>
              </div>
              <div className="card-content">
                <span className="card-title">{books[key].title}</span>
                <strong>{books[key].author}</strong>
                <p>{books[key].description}</p>
                <p>${books[key].price}</p>
              </div>
            </div>
          </div>
        )
      })
    } else {
      bookList = Object.keys(this.props.filtered).map(key => {
        const books = this.props.books;
        return (
          <div key={`card${key}`} className="col s12">
            <div className="card">
              <div className="card-image">
                <a targer="blank" href={books[key].website}><img alt="book" src={`https://source.unsplash.com/350x200/?${books[key].title}`} /></a>
                <button onClick={() => this.props.addBook(key)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons delete">add</i></button>
              </div>
              <div className="card-content">
                <span className="card-title">{books[key].title}</span>
                <strong>{books[key].author}</strong>
                <p>{books[key].description}</p>
                <p>${books[key].price}</p>
              </div>
            </div>
          </div>
        )
      })
    }

    return (
      <div className="Search">  
        <form>
          <input onChange={e => this.props.updateSearch(e.target.value)} type="text" name="search" placeholder="Search..."></input>
        </form> 
        <div className="row">
          <div className="col s12">
            {bookList}
          </div>          
        </div>
      </div>
    );
  }

}

export default Search;
