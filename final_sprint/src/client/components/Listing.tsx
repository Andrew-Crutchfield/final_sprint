import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET, POST, PUT, DELETE } from '../services/fetcher';
import PrivateWrapper from './PrivateWrapper'; 

interface Book {
  id: number;
  title: string;
  author: string;
  price?: number;
  categoryid: number;
}

interface Category {
  id: number;
  name: string;
}

const BookListing: React.FC = () => {

  return (
    <PrivateWrapper> 
      <div>
        <h1>Book Listing</h1>
        <Link to="/bookdetails">Go to Book Details</Link>

      </div>
    </PrivateWrapper>
  );
};

export default BookListing;
