import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfListBook from "./components/ShelfListBook";
import SearchBook from "./components/SearchBook";
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
   state = {
            books: [],
            showSearchPage: true,
        }
    
//////////////
    componentDidMount() {
         this.f_bookList(); 
    }

    f_bookList() {
           BooksAPI.getAll().then(books => {
            this.setState({books: books,showSearchPage: false})
        });
       }
       //////////////////update///////////////////
     constructor(props) {
       super(props);
       this.ChangeShelf = this.ChangeShelf.bind(this);
        }

    ChangeShelf(book, shelf){
        BooksAPI.update(book, shelf)
            .then(this.setState((state) => ({
                    books: state.books.map(c => {
                        while (c.title === book.title) {
                            c.shelf = shelf;
                            return c
                        } 
                            return c
                        
                    }),
                   showSearchPage: false
                }))
            )
    };
//////////////////////////////////////////////////
    render() {
       return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <div>
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        {
                            !this.state.showSearchPage ? (
                                <ShelfListBook 
                                    cReading={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                                    wRead={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                                    read={this.state.books.filter((book) => book.shelf === 'read')}
                                    ChangeShelf={this.ChangeShelf}
                                />
                            ) : (
                                <div className="loading"/>
                            )
                        }
                    </div>
                )}/>


                <Route path="/search" render={({h}) => (
                    <SearchBook ChangeShelf={this.ChangeShelf} h={h} books={this.state.books.filter((book) => book.shelf === 'currentlyReading').concat(this.state.books.filter((book) => book.shelf === 'wantToRead'),
                            this.state.books.filter((book) => book.shelf === 'read') )}
                    />

                )}/>
            </div>
        )
    }
}
export default BooksApp