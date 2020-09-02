import { useState, useEffect } from 'react';

const useInitialState = (API) => {
  const [ videos, setVideos ] = useState({mylist: [], trends: [], originals: [] });//elemento que maneja el estado,es quien recibe como propiedad elementos para inicializar mi estado y pueden ser: un string, un número, un booleano o un objeto o arreglo
  useEffect(() => {
    fetch(API)
      .then(Response => Response.json())//acá estamos diciendo que cuando la API resuelva la información, la transformaré en un objeto que pueda usar en mi aplicación
      .then(data => setVideos(data));
  }, []);
  return videos;
};

export default useInitialState;