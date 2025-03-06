'use client';

import Image from 'next/image';
import { FaSearch, FaBell, FaPlay, FaPlus } from 'react-icons/fa';

export default function LayoutNetflix() {


  const  title = 'Test Title'
  const  ano = 2024;
  const  mes = 3;
  const  dia = 12;

  const  textContent= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

  const  cast = 'cast1, cast2'

  return (
    <div className="bg-black text-white font-roboto min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black bg-opacity-75 fixed w-full z-10">
        <div className="flex items-center space-x-4">
          <Image
            src="https://storage.googleapis.com/a1aa/image/zmBSc0wHj2miqRK9AyuETe8IMhLlybcxkJoM-6NZ6k8.jpg"
            alt="Netflix logo"
            width={100}
            height={50}
            className="h-8"
          />
          <nav className="hidden md:flex space-x-4">
            <a className="hover:underline" href="#">Home</a>
            <a className="hover:underline" href="#">TV Shows</a>
            <a className="hover:underline" href="#">Movies</a>
            <a className="hover:underline" href="#">New & Popular</a>
            <a className="hover:underline" href="#">My List</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <FaSearch />
          <FaBell />
          <Image
            src="https://storage.googleapis.com/a1aa/image/sILjXQPW8orSiqWhbrqJq5D1itP_P651DbQXgH9SKkE.jpg"
            alt="User profile icon"
            width={30}
            height={30}
            className="h-8 w-8 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <section className="relative">
          <Image
            src="https://storage.googleapis.com/a1aa/image/nmIvRRWXNoS0lIetEQGxORz1bSJKTO1Q9kFmYL1gPBg.jpg"
            alt="Movie banner"
            width={1920}
            height={1080}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span className="text-gray-400">{ano}</span>
              <span className="px-2 py-1 border border-gray-400 rounded">{mes}</span>
              <span className="text-gray-400">{dia}</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <button className="flex items-center bg-white text-black px-4 py-2 rounded">
                <FaPlay className="mr-2" /> Play
              </button>
              <button className="flex items-center bg-gray-700 bg-opacity-75 px-4 py-2 rounded">
                <FaPlus className="mr-2" /> My List
              </button>
            </div>
          </div>
        </section>

        <section className="p-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 mb-4">
                {textContent}
              </p>
              <h3 className="text-xl font-bold mb-2">Cast</h3>
              <p className="text-gray-300 mb-4">{cast}</p>
              <h3 className="text-xl font-bold mb-2">Genres</h3>
              <p className="text-gray-300 mb-4">Adventure, Drama, Romance</p>
            </div>
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">More Like This</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <Image
                      src={`https://storage.googleapis.com/a1aa/image/y-mLfRS_bHSyCta2_nt0Wajjegy9oIaKNTQ-oKrC150.jpg`}
                      alt={`Movie ${num} poster`}
                      width={150}
                      height={225}
                      className="w-full h-auto"
                    />
                    <p className="text-gray-300 mt-2">Movie {num}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
