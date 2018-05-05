
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

 class SearchBook extends Component {
    state = {
            
            ResultSearch: []
        }
componentDidMount (){
    BooksAPI.getAll().then((ResultSearch) =>{
        this.setState({ ResultSearch} )
    })
}
////////////////////
       constructor(props) {
       super(props);
       this.search = this.search.bind(this);
        }
        
    search(e){
         if (e.target.value !== '') { 
         BooksAPI.search(e.target.value).then((ResultSearch) => {
            if (!ResultSearch || ResultSearch.error) {
              this.setState({ ResultSearch: [] })
              return
            }
            ResultSearch = ResultSearch.map((book) => {
               
                if (this.props.books.find(c => c.id === book.id)) {
                    book.shelf = this.props.books.find(c => c.id === book.id).shelf;
                   
                }
                else {
                book.shelf='none'
              }
                return book;
            });
            this.setState({ResultSearch});
        });
    }
    else {
        this.setState({ResultSearch: []})
    }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.search}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.ResultSearch.map(book => (
                            <li key={book.id}>
                                <Book book={book} ChangeShelf={this.props.ChangeShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBook