import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <header className="container flex flex-col lg:flex-row items-center justify-center lg:justify-between pt-2 gap-2 max-w-[95%] lg:max-w-7xl mx-auto">
        <a href="/">
          <div className="flex gap-2 items-center">
            <img src="favicon.png" alt="logo" className="w-7 h-7 rounded-md" />
            <span className="text-3xl font-bold tracking-tight font-sans">OurLovee</span>
          </div>
        </a>
        {/* <div className="flex items-center justify-center lg:justify-start gap-4 text-xs w-48 z-50">
          <button className="font-bold text-primarypink">
            <mark className="bg-primarypink text-white px-1 rounded">🇧🇷 PT</mark>
          </button>
          <a className="z-50" href="/en">
            <button className="">🇺🇸 EN</button>
          </a>
        </div> */}
      </header>
    );
  }
}

export default Header;
