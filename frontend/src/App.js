import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState({
    id: '',
    name: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/items');
    setItems(res.data);
  };

  const addItem = async () => {
    if (newItem) {
      await axios.post('http://localhost:5000/items', {
        name: newItem,
      });
      setNewItem('');
      fetchItems();
    }
  };

  const updateItem = async (id, name) => {
    await axios.put(`http://localhost:5000/items/${id}`, {
      name,
    });
    setEditItem({
      id: '',
      name: '',
    });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  return (
    <div className="app-container">
      <h1 className="header">Product List to Buy</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add new product"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="input-field"
        />
        <button onClick={addItem} className="add-button">
          Add
        </button>
      </div>

      <ul className="list">
        {items.map((item) => (
          <li key={item._id} className="list-item">
            {editItem.id === item._id ? (
              <input
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                className="input-field"
              />
            ) : (
              <span className="item-text">{item.name}</span>
            )}

            {editItem.id === item._id ? (
              <button
                onClick={() => updateItem(item._id, editItem.name)}
                className="update-button"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => setEditItem({ id: item._id, name: item.name })}
                className="edit-button"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => deleteItem(item._id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
