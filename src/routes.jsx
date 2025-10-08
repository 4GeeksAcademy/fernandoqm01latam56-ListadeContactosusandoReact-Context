import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { ListaDeContacto } from "./components/ListaDeContacto";
import { FormularioContacto } from "./pages/FormularioContacto";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Home />} />                 {/* Página principal */}
      <Route path="contacts" element={<ListaDeContacto />} />  {/* Lista de contactos */}
      <Route path="formulario" element={<FormularioContacto />} />
      <Route path="formulario/:id" element={<FormularioContacto />} />
    </Route>
  )
);
