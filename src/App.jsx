import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';  // Importing search icon from react-icons
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchDefinition = async () => {
    if (!word) return;

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        setError('Word not found');
        setData(null);
        return;
      }
      const data = await response.json();
      setData(data[0]);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      setData(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg w-full max-w-full max-h-full">
        <h1 className="text-2xl font-bold text-center mb-4">Dictionary</h1>
        
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white"
          placeholder="Enter a word"
        />
        
        {/* Search Button with React Icon */}
        <button
          onClick={fetchDefinition}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex justify-center items-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        
        {data && !error && (
          <div className="mt-6 p-4 border border-gray-600 rounded-md bg-gray-700">
            <h3 className="font-semibold text-xl">Word: <span className="text-blue-400">{data.word}</span></h3>

            {data.phonetic && (
              <p className="text-gray-400 mt-2">
                <strong>Phonetic:</strong> <span className="italic">{data.phonetic}</span>
              </p>
            )}

            {data.meanings && data.meanings.map((meaning, index) => (
              <div key={index} className="mt-4">
                <h4 className="font-semibold text-lg">{meaning.partOfSpeech && `${meaning.partOfSpeech.charAt(0).toUpperCase() + meaning.partOfSpeech.slice(1)}:`}</h4>
                <ul className="list-disc pl-6 mt-2">
                  {meaning.definitions.map((def, idx) => (
                    <li key={idx} className="text-gray-300">
                      <strong>{def.definition}</strong>
                      {def.example && <p className="text-gray-500 italic mt-1">Example: "{def.example}"</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
