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
  const [videoId, setVideoId] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchComments = async () => {
    // if(!videoId) return;
    
    // setLoading(true);
    // setError('');
    // setComments([]);
    console.log('entra')
    try{
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?&videoId=${videoId}&key=${API_KEY}&maxResults=10`
      );

      console.log('Respuesta API: ', response);
      const data = await response.json();
      console.log('fetchComments Respuesta API: ', data);
      // if(data.error){
      //   setError(data.error);
      //   setLoading(false);
      //   return;
      // }

      // const commentsData: Comment[] = data.

    }catch(err){

    }


  }

  useEffect(() => {
    if(videoId){
      fetchComments();
    }
  }, [videoId])
  

  return (
    <div className="App">
      <h1>Comentarios YT</h1>
      <input 
        type='text'
        placeholder='Introduce video ID'
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
    </div>
  )
}

export default App
