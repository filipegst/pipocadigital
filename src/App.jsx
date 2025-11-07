import { useEffect, useState } from "react"
import Pesquisa from "./Components/Pesquisa"
import './index.css'
import Carregando from "./Components/Carregando";
import FilmeCard from "./Components/FilmeCard";
import { useDebounce } from "react-use";

const API_BASE_KEY ='https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers:{
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`
  }
}

function App() {

  const [pesquisaTopico, setPesquisaTopico] = useState("")
  const [mensagemErro, setMensagemErro] = useState("")
  const [filmes, setFilmes] = useState([])
  const [filmesCarregando, setFilmesCarregando] = useState(false)
  const [debouncepesquisaTopico, setDeboucePesquisaTopico] = useState('')

  useDebounce(() => setDeboucePesquisaTopico(pesquisaTopico), 600, [pesquisaTopico])

  
  const pegaFilmes = async(query = '') =>{

    setFilmesCarregando(true)
    setMensagemErro("")
    
    try{
      
      const endpoint = query ? `${API_BASE_KEY}/search/movie?query=${encodeURIComponent(query)}&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc`
      : `${API_BASE_KEY}/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc`
      
      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok){
        throw new Error("Erro ao buscar filmes")
      }
      const data = await response.json();

      if(data.response ==="False"){
        setMensagemErro(data.Error || "Erro ao buscar filmes")
        setFilmes([])
        return
      }
      setFilmes(data.results || [])


   

      
    
      console.log(data);
    }
    catch(error){
      console.log(`Erro ao buscar filmes: ${error}`)
      setMensagemErro("Não foi possível buscar os filmes no momento. Tente novamente mais tarde")
    }
    finally{
      setFilmesCarregando(false)
    }
  } 
  
  useEffect(() =>{
    pegaFilmes(debouncepesquisaTopico)
  }, [debouncepesquisaTopico])

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Banner" />
          <h1> Encontre <span className="text-gradient">Filmes</span> que Você Vai Amar</h1>
          <Pesquisa pesquisaTopico={pesquisaTopico} setPesquisaTopico={setPesquisaTopico} />
        </header>
      <section className="todos-filmes">
        <h2 className="mt-[40px]">Todos os Filmes</h2>

        {filmesCarregando ? (
          <Carregando/>
        ): mensagemErro ? (
          <p className="text-red-500">{mensagemErro}</p>
        ):(
          <ul>
            {filmes.map((filme) => (
              <FilmeCard key={filme.id} filme={filme}  />
            ))}
          </ul>
        )}

      </section>

      </div>
    
        <footer>
          <div className="mt-2 p-4  border-t-4 border-t-dark-100 bg-light-100/5">
            <p className="text-white text-center ">Criado por <a className="text-[18px] " href="https://github.com/filipegst">Filipe Guimaraes</a> </p>      
          </div>
        </footer>
    </main>
  )
}

export default App
