import React from 'react'

const Pesquisa = ({pesquisaTopico, setPesquisaTopico}) => {
  return (
    <div className="pesquisa">
        <div>
            <img src="search.svg" alt="lupa" />
            <input 
                type="text"
                placeholder='Pesquise entre milhares de filmes online ' 
                value={pesquisaTopico}
                onChange={(e) => setPesquisaTopico(e.target.value)}
                />
        </div>
    </div>
  )
}

export default Pesquisa
