import { useState, useEffect } from "react";
import { searchUserFetching } from "../services/UserFetching";
import { Link } from "react-router-dom";

const SearchBar = ({toggleMenu}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const  response  = await searchUserFetching(query);
        if (response.success) {
          setResults(response.users);
        } else {
          setResults([]);
        }
      } catch (error) {
        setError("Error al buscar usuarios", error);
        setResults([]);
      }
      setLoading(false);
    };

    const debounceTimeout = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSelectUser = () => {
    setQuery("");
    setResults([]);
    toggleMenu()
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
      />
      {loading && <p className="text-sm text-gray-500">Cargando...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {results.length > 0 && (
         <div className="absolute w-full bg-white dark:bg-stone-800 border rounded mt-1 shadow-md">
         {results.map((user) => (
           <Link
             key={user._id}
             to={`/user/${user.username}`}
             onClick={handleSelectUser}
             className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-stone-700"
           >
             <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
             <span>{user.username}</span>
           </Link>
         ))}
       </div>
      )}
    </div>
  );
};

export default SearchBar;
