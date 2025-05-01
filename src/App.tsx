import { useState, useEffect } from 'react'
import './App.css'

interface Comment {
  author: string;
  text: string;
}

const API_KEY = import.meta.env.VITE_YT_API_KEY;
console.log(import.meta.env);
console.log("API KEY: ", API_KEY);

function App() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function extractVideoId(url: string):string|null {
    try{
      const parsedUrl = new URL(url);
      const videoId = parsedUrl.searchParams.get("v");
      return videoId;
    }catch{
      return null;
    }
  }

  const fetchComments = async () => {

    const videoId = extractVideoId(videoUrl);

    if(!videoId) return;

    setLoading(true);
    setError('');
    setComments([]);
    console.log('entra')
    try{
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10`
      );

      console.log('Respuesta API: ', response);
      const data = await response.json();
      console.log('fetchComments Respuesta API: ', data);
      if(data.error){
        setError(data.error.message);
        setLoading(false);
        return;
      }

      const commentData: Comment[] = data.items.map((item: any) => {
        return{
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textDisplay
        };
      })

      setComments(commentData);

    }catch(err: any){
      console.error("Error: ", err);
      setError(err?.message || "Error desconocido.");
    }finally{
      setLoading(false);
    }


  }

  return (
    <div className="App">
      <h1>Comentarios YT</h1>
      <input
        type='text'
        placeholder='Introduce video Url...'
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button onClick={fetchComments}>Buscar</button>

      {loading && <p>Cargando comentarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {comments.map((comment,index) => (
          <li key={index}>
            {comment.author}: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
