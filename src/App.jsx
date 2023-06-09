import { useEffect, useState } from "react";

export default function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  async function search(q) {
    const res = await fetch("http://localhost:7777?" + new URLSearchParams({ q }));
    const data = await res.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  }

  function Animal({ type, name, age }) {
    return (
      <li>
        <strong>{type}</strong> {name} ({age} years old)
      </li>
    );
  }

  return (
    <>
      <main>
        <h1>Animal Catalog</h1>
        <form action="">
          <input type="text" placeholder="Search..." onChange={(e) => search(e.target.value)} />
        </form>

        <ul>
          {animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
          ))}

          {animals.length === 0 && "No animals found"}
        </ul>
      </main>
    </>
  );
}
