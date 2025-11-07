import React from 'react'

const FilmeCard = ({filme:{title, vote_average, poster_path, release_date, original_language}}) => {
  return (
        <div className='filme-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-poster-tall.png"} alt={title} />    
        
            <div className='mt-4'>
                <h3>{title}</h3>

                <div className='conteudo'>
                    <div className='avaliacao'>
                        <img src="star.svg" alt="Icone de Estrela" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>
                    <span>•</span>
                    <p className='linguagem'>{original_language}</p>
                    <span>•</span>
                    <p className='ano'>{release_date ?  release_date.split("-")[0] : "N/A"}</p>

                </div>
            </div>
        
        </div>
   

        
  )
}

export default FilmeCard
