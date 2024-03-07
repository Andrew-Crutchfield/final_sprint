import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { query } from '../db/db';
import { Book } from '../types';



const getAllBooks = async (_req: Request, res: Response) => {
    try {
      const books = await query('SELECT * FROM books');
      res.json({ books });
    } catch (error) {
      console.error('Error fetching books', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const book = await query('SELECT * FROM books WHERE id = ?', [id]);
      if (book.length === 0) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.json({ book: book[0] });
      }
    } catch (error) {
      console.error('Error fetching book by ID', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const createBook = async (req: Request, res: Response) => {
    const { title, author, price, categoryid } = req.body;
    try {
      await query('INSERT INTO books (title, author, price, categoryid) VALUES (?, ?, ?, ?)', [
        title,
        author,
        price,
        categoryid,
      ]);
      res.json({ message: 'Book created successfully' });
    } catch (error) {
      console.error('Error creating book', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, price, categoryid } = req.body;
    try {
      await query(
        'UPDATE books SET title = ?, author = ?, price = ?, categoryid = ? WHERE id = ?',
        [title, author, price, categoryid, id]
      );
      res.json({ message: 'Book updated successfully' });
    } catch (error) {
      console.error('Error updating book', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await query('DELETE FROM books WHERE id = ?', [id]);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export { getAllBooks, getBookById, createBook, updateBook, deleteBook };