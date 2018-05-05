
import React, {Component} from 'react';
import ShelfedBook from './ShelfedBook.js';
import {Link} from 'react-router-dom';

 class ShelfListBook extends Component {
    render() {

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <ShelfedBook Title='Currently Reading' List={this.props.cReading} ChangeShelf={this.props.ChangeShelf}/>
                        <ShelfedBook Title='Want to Read'  List={this.props.wRead} ChangeShelf={this.props.ChangeShelf}/>
                        <ShelfedBook Title='Read'  List={this.props.read} ChangeShelf={this.props.ChangeShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Adding book</Link>
                </div>
            </div>
        );
    }
}
export default  ShelfListBook