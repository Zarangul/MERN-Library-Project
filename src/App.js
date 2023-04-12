import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import AddBook from "./components/AddBook";
import Book from "./components/Book";
import Navbar from "./components/Navbar";

function App() {
  const [books, setBooks] = useState([]);

  const [book, setBook] = useState({
    bookName: "",
    author: "",
    quantity: "",
    department: "",
    comments: "",
  });

  useEffect(() => {
    fetch("/books")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setBooks(jsonRes);
      });
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const addBook = () => {
    const newBook = {
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity,
      department: book.department,
      comments: book.comments,
    };
    axios.post("/newbook", newBook)
    alert(`The book ${book.bookName} is added`);
    setBook({
      bookName: "",
      author: "",
      quantity: "",
      department: "",
      comments: "",
    });
  };
  const deleteBook = (id) => {
    axios.delete("/delete/" + id);
    alert(`The book with id ${id} is deleted`);
  };
  const lendBook = (id) => {
    axios.put("/lend/" + id);
    alert(`The book with id ${id} is lended`);
  };
  const backBook = (id) => {
    axios.put("/back/" + id);
    alert(`The book with id ${id} is back`);
  };

  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Book
              books={books}
              lendBook={lendBook}
              deleteBook={deleteBook}
              backBook={backBook}
            />
          }
        />
        <Route
          path="/addbook"
          element={
            <AddBook
              book={book}
              handleChange={handleChange}
              addBook={addBook}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
