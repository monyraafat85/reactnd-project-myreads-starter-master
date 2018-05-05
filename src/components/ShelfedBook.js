import React, {Component} from 'react';
import Book from "./Book.js";

 class ShelfedBook extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.List.map((book) => {
                            return <li key={book.id}>
                            <Book book={book} ChangeShelf={this.props.ChangeShelf}/>
                                </li>
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default ShelfedBook