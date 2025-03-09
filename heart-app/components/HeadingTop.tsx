import React, { Component } from 'react'

export class HeadingTop extends Component {
  render() {
    return (
        <header className="flex h-10 items-center justify-center bg-gradient-to-r from-red-600 to-red-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
       ❤️ <strong>Dia da mulher</strong> - Todos os planos com 50% de desconto!
      </header>
    )
  }
}

export default HeadingTop