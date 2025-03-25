// components/FoodSearch.tsx
import React, { useState, FormEvent } from 'react';

const FoodSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const searchFoods = async (q: string) => {
    if (!q.trim()) return; // 防止空查询
    setLoading(true);
    try {
      const response = await fetch('/api/queryCholesterol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName: q }),
      });

      const data = await response.json();

      if (response.ok) {
        setFoods(data.result);
      }
    } catch (error) {
      console.error('获取食物数据失败：', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchFoods(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="请输入建议食物名称..."
          className="w-full py-4 pl-6 pr-14 border border-teal-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder-teal-500"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
          title="搜索"
        >
          <svg
            className="w-6 h-6 text-teal-500 hover:text-teal-700 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      <div className="mt-8">
        {loading ? (
          <p className="text-center text-teal-600">加载中...</p>
        ) : foods ? (
          <ul className="grid gap-6">
            <li className="p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-bold text-green-600"
                  dangerouslySetInnerHTML={{ __html: foods }}
                ></span>
              </div>
              <p className="mt-2 text-sm text-teal-600">
                建议摄入量：保持在适宜范围
              </p>
            </li>
          </ul>
        ) : (
          <p className="text-center text-gray-500">请输入食物名称进行搜索</p>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
