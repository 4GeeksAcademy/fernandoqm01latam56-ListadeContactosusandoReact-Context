import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListaDeContacto() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initializeAgenda = async () => {
      try {
        // Primero intentamos obtener contactos
        let res = await fetch("https://playground.4geeks.com/contact/agendas/fquesada/contacts");

        if (res.status === 404) {
          // Si no existe, creamos la agenda
          const createRes = await fetch("https://playground.4geeks.com/contact/agendas/fquesada", {
            method: "POST",
          });
          if (!createRes.ok) throw new Error("No se pudo crear la agenda");

          // Intentamos obtener contactos otra vez
          res = await fetch("https://playground.4geeks.com/contact/agendas/fquesada/contacts");
        }

        if (!res.ok) throw new Error("Error al cargar contactos");
        const data = await res.json();
        setContacts(data.contacts || []);

      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    };

    initializeAgenda();
  }, []);


  const getData = async () => {
    try {
      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas/fquesada/contacts"
      );
      if (!res.ok) throw new Error("Error al cargar contactos");
      const data = await res.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // getData solo se ejecuta una vez al montar...

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este contacto?")) return;

    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/fquesada/contacts/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        alert("Contacto eliminado correctamente");
        setContacts(prev => prev.filter(c => c.id !== id)); // filter busca el id especifico y me devuelve un array si ese id especifico

      } else {
        alert("Error al eliminar el contacto");

      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  return (
    <div className="d-flex flex-column container mt-4">
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success my-2 rounded-pill"
          onClick={() => navigate("/formulario")}
        >
          Agregar Nuevo Contacto
        </button>
      </div>

      <ul className="list-group">
        {contacts.length === 0 && (
          <li className="list-group-item text-center text-secondary rounded-pill">
            No hay contactos aún
          </li>
        )}
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="list-group-item d-flex align-items-center rounded-pill"
          >
            <div
              className="p-1 mx-3 d-flex"
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src="https://us.123rf.com/450wm/infinetsoft/infinetsoft2006/infinetsoft200600239/148336451-user-icon-avatar-men-contact-symbol-black-white-perfect-for-business-concepts-icon-sign.jpg"
                className="img-fluid rounded-circle"
                alt="avatar"
              />
            </div>
            <div className="flex-grow-1 d-flex flex-column rounded-pill">
              <h6 className="text-start mb-1">{contact.name}</h6>
              <p className="text-secondary mb-0 rounded-pill">
                <i className="fa-solid fa-location-dot me-2"></i>
                {contact.address}
              </p>
              <p className="text-secondary mb-0 rounded-pill">
                <i className="fa-solid fa-phone-flip me-2"></i>
                {contact.phone}
              </p>
              <p className="text-secondary mb-0 rounded-pill">
                <i className="fa-solid fa-envelope me-2"></i>
                {contact.email}
              </p>
            </div>
            <div className="d-flex gap-3 mx-3">
              <button
                type="button"
                className="btn btn-outline-dark border-0"
                onClick={() => navigate(`/formulario/${contact.id}`)}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-dark border border-0"
                onClick={() => handleDelete(contact.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>

            </div>


          </li>


        ))}
      </ul>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-info mt-2 "
          onClick={() => navigate("/")}
        >Home</button>
      </div>
    </div>
  );
}
