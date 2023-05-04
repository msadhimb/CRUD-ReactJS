import React from "react";

const List = ({ data, handleEdit, handleDelete }) => {
  let i = 1;
  return (
    <>
      {data.map((contacts) => {
        // looping json dari state contact
        return (
          <tr>
            <th scope="row">{i++}</th>
            <td>{contacts.name}</td>
            <td>{contacts.telp}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-warning me-2"
                onClick={
                  () =>
                    handleEdit(
                      contacts.id
                    ) /* memiliki parameter id karena functionnya memiliki parameter id */
                }
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(contacts.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default List;
