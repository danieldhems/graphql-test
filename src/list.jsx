import React from "react";
import { Link } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { getBooks } from "./queries";
import "./list.css";

const client = new ApolloClient({
    uri: "http://localhost:4567/graphql",
    defaultOptions: {}
});

export class List extends React.Component {
    state = {
        books: [],
        selected: [],
        itemsToShowBasketReadout: [],
    }
    fetchBooks(){
        console.log(this.props)
        client.query({query: getBooks})
        .then( response => {
            this.setState({books: response.data.books})
        })
    }
    isSelected(bookId){
        return this.state.selected.find(b => b.bookId === bookId);
    }
    toggleBasketReadout(bookId){
        if(this.state.itemsToShowBasketReadout.includes(bookId)){
            this.setState({
                itemsToShowBasketReadout: this.state.itemsToShowBasketReadout.filter( b => b !== bookId)
            })
        } else {
            this.setState({
                itemsToShowBasketReadout: [...this.state.itemsToShowBasketReadout, bookId],
            })
        }
    }
    selectBook(book){
        !this.isSelected(book.bookId) && this.setState({
            selected: [...this.state.selected, book]
        })
    }
    deselectBook(book){
        this.isSelected(book.bookId) && this.setState({
            selected: this.state.selected.filter(b => b.bookId !== book.bookId)
        })
    }
    getBasketTotat(){
        let price = 0;
        if(this.state.selected.length > 0){
            this.state.selected.map( b => { price += b.price})
        }
        return price.toFixed(2);
    }
    getNumSelectedBooksReadout(){
        return `${this.state.selected.length} book${this.state.selected.length !== 1 ? "s" : ""}.`;
    }
    getBasketStatus(){
        return (
            <span>
                Basket total: &pound;{this.getBasketTotat()},
                &nbsp;
                {this.getNumSelectedBooksReadout()}
            </span>
        )
    }
    listBooks(){
        const {books} = this.state;
        return books.length > 0 && (   
            <ul>
                {books.map( book => this.renderBookItem(book))}
            </ul>
        )
    }
    renderBookItem(book){
        const { bookId, title, author, price } = book;
        return (
            <li className={this.isSelected(bookId) ? "is-selected" : ""}>
                <p>
                    <strong>{title}</strong> ({bookId})
                    <br/>
                    by {author}
                    <br />
                    Price: &pound;{price.toFixed(2)}
                    <br />
                        <Link
                            to={{
                                pathname: `/edit/${bookId}`,
                                state: {
                                    bookId,
                                    title,
                                    author,
                                    price,
                                }
                            }}
                        >
                            <i className="fas fa-edit"></i>Edit
                        </Link>
                    <br/><button onClick={() => this.selectBook(book)}>Add to basket</button>
                    <br/><button onClick={() => this.deselectBook(book)}>Remove from basket</button>
                    <br/><button onClick={() => this.toggleBasketReadout(book.bookId)}>Toggle basket info</button>
                    <br />
                    {
                        this.state.itemsToShowBasketReadout.includes(bookId) && this.getBasketStatus()
                    }
                </p>
            </li>
        )
    }

    componentDidMount(){
        this.fetchBooks()
    }
    render(){
        return (
            <div>
                <p>Browse our fine collection of literature</p>
                <p><Link to="/create">Create</Link></p>
                {this.getBasketStatus()}
                <br />
                {this.listBooks()}
            </div>
        )
    }
}

export default List;