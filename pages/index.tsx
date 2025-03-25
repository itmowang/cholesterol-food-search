// pages/index.tsx
import type { NextPage } from 'next';
import FoodSearch from '../components/FoodSearch';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-100 flex flex-col items-center justify-center py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold text-teal-800 mb-4">胆固醇建议</h1>
        <p className="text-xl text-teal-700">探索科技感的健康饮食方案</p>
      </header>
      <FoodSearch />
    </div>
  );
};

export default Home;
