import React from "react";

export default function Book({ books, deleteBook, lendBook, backBook }) {
  return (
    <div className="container mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Department</th>
            <th scope="col">Quantity</th>
            <th scope="col">Process</th>
          </tr>
        </thead>
        <tbody>
            {
                books?.map((book, index)=>{
                    return (
                        <tr scope="col" key={index}>
                            <td scope="col">{index+1}</td>
                            <td data-toggle="tooltip" data-placement="top" title={book.comments}>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{book.department}</td>
                            <td>{book.quantity}</td>
                            <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Choose
                                </button>
                                <div className="dropdown-menu ">
                                  <button onClick={()=>deleteBook(book._id)} className="btn btn-outline-danger">DELETE</button>
                                  <div className="dropdown-divider"></div>
                                  <button onClick={()=>lendBook(book._id)} className="btn btn-outline-primary">LEND</button>
                                  <div className="dropdown-divider"></div>
                                  <button onClick={()=>backBook(book._id)} className="btn btn-outline-success">BACK</button>
                                </div>
                              </div>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  );
}
