import React from "react";
import ApolloClient from 'apollo-boost';
import { createBook } from "./queries";

// Apollo Client being initiated inside each relevant file because ApolloProvider doesn't seem to be working
// Relevant discussion about broken tutorial(s) here: https://github.com/apollographql/apollo-client/issues/3639
const client = new ApolloClient({
    uri: "http://localhost:4567/graphql",
    defaultOptions: {}
});

class Create extends React.Component {
    createBook(e){
        e.preventDefault();
        const title= this.refs.titleField.value;
        const author= this.refs.authorField.value;
        const price= this.refs.priceField.value;
        
        client.mutate({mutation: createBook, variables: {title, author, price}})
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
        return (
            <React.Fragment>
                <p>Create a book</p>
                <form>
                    <p>
                        Title<br/>
                        <input type="text" placeholder="Title" ref="titleField" />
                    </p>
                    <p>
                        Author<br/>
                        <input type="text" placeholder="Author" ref="authorField" />
                    </p>
                    <p>
                        Price<br/>
                        <input type="text" placeholder="Price" ref="priceField" />
                    </p>
                    <button onClick={e => this.createBook(e)}>Create</button>
                    <button onClick={e => this.goHome(e)}>Cancel</button>
                </form>
            </React.Fragment>
        )
    }
}

export default Create;