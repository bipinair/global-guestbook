import React, { useState, useEffect } from 'react';

function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  // 1. ACTION: Fetch existing messages when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/signatures')
      .then(res => res.json())
      .then(data => setEntries(data));
  }, []);

  // 2. ACTION: Send the new signature to the Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading (The C-style behavior)
    
    const response = await fetch('http://localhost:5000/api/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }) // Packing the JSON box
    });

    const newEntry = await response.json();
    setEntries([newEntry, ...entries]); // Update the list on screen immediately
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Global Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} /><br/>
        <button type="submit">Sign Guestbook</button>
      </form>

      <hr />
      <h2>Recent Signs:</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <strong>{entry.name}</strong>: {entry.message}
        </div>
      ))}
    </div>
  );
}

export default Guestbook;