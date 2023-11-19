import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ComicList.css';

function ComicList() {
  const [comicNames, setComicNames] = useState([]);

  useEffect(() => {
    const fetchComicNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetch-comic-names');
        setComicNames(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchComicNames();
  }, []);

  return (
    <div className="comic-list-container">
      <h1>Comic List</h1>
      <ul>
        {comicNames.map((comicName, index) => (
          <li key={index} className="comic-item">
            <Link to={`/comic/${comicName}`} className="comic-link">
              {comicName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComicList;
