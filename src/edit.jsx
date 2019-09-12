import React from "react";
import ApolloClient from 'apollo-boost';
import { editBook } from "./queries";

// Apollo Client being initiated inside each relevant file because ApolloProvider doesn't seem to be working
// Relevant discussion about broken tutorial(s) here: https://github.com/apollographql/apollo-client/issues/3639
const client = new ApolloClient({
    uri: "http://localhost:4567/graphql",
    defaultOptions: {}
});

class Edit extends React.Component {
    editBook(e){
        e.preventDefault();

        // Existing book properties
        const { title, author, price } = this.props.location.state;

        const bookId = parseInt(this.props.match.params.bookId);
        
        // New book properties, if provided, else use existing ones
        const variables = {};
        variables.bookId = bookId;
        variables.title = this.refs.titleField.value ? this.refs.titleField.value : title;
        variables.author = this.refs.authorField.value ? this.refs.authorField.value : author;
        variables.price = this.refs.priceField.value ? parseFloat(this.refs.priceField.value) : price;

        client.mutate({
            mutation: editBook,
            variables,
        })
        .then(response => {
            if(response.errors){
                console.log(response.errors)
            } else {
                this.goHome()
            }
        })
    }
    goHome(e){
        if(e) e.preventDefault()
        this.props.history.push("/")
    }
    render(){
        if(!this.props.location.state){
            return (
                <p>No book selected for editing</p>
            )
        }
        const { title, author, price } = this.props.location.state;
        return (
            <React.Fragment>
                <p>Edit book: {title}</p>
                <form>
                    <p>
                        Title<br/>
                        <input type="text" placeholder={title}  ref="titleField" />
                    </p>
                    <p>
                        Author<br/>
                        <input type="text" placeholder={author}  ref="authorField" />
                    </p>
                    <p>
                        Price<br/>
                        <input type="text" placeholder={price}  ref="priceField" />
                    </p>
                    <button onClick={e => this.editBook(e)}>Edit</button>
                    <button onClick={e => this.goBack(e)}>Cancel</button>
                </form>
            </React.Fragment>
        )
    }
}

export default Edit;