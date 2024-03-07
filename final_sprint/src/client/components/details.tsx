import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GET } from '../services/fetcher';

interface Book {
  id: number;
  title: string;
  author: string;
  price?: number;
  categoryid: number;
  created_at?: Date;
}

const Details: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await GET<Book>(`/api/books/${id}`);
        setBook(response);
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Category ID: {book.categoryid}</p>
      <Link to="/booklisting">Back to Book Listing</Link>
    </div>
  );
};

export default Details;
