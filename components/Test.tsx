import { useState } from 'react';

const CholesterolQuery = () => {
  const [foodName, setFoodName] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setError('');

    try {
      const response = await fetch('/api/queryCholesterol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="输入食物名称"
        />
        <button type="submit">查询</button>
      </form>
      {result && <div>{result}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default CholesterolQuery;
