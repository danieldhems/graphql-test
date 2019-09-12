import { gql } from 'apollo-boost';

export const getBooks = gql`
    {
        books{
            bookId, 
            title, 
            author,
            price
        }
    }
`;

export const createBook =  gql`
    mutation ($title: String!, $author: String!, $price: Float!){
        createBook(title: $title, author: $author, price: $price){
            bookId,
            title,
            author,
            price,
        }
    }
`;

export const editBook = gql`
    mutation ($bookId: Int!, $title: String!, $author: String!, $price: Float!){
        editBook(bookId: $bookId, title: $title, author: $author, price: $price){
            bookId,
            title,
            author,
            price,
        }
    }
`;
