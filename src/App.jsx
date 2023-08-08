import { Routes, Route } from "react-router-dom";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Home from "./components/Home/Home";
import Formulario from "./components/Formulario/Formulario";
import "./App.css";

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/formularioIngreso" element={<Formulario />} />
      </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
