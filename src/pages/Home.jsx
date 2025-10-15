import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center my-5  bg-primary text-white rounded-pill">
      <h2 className="display-4 mt-3 p-5">Bienvenido a tu Lista de Contactos</h2>
      <p className="lead mt-3">
        Administra tus contactos: crea, edita y elimina.
      </p>
      <button
        className="btn btn btn-info btn-lg mt-4 mb-4 rounded-pill "
        onClick={() => navigate("/contacts")}
      >
        Ver mis contactos
      </button>
    </div>
  );
}
