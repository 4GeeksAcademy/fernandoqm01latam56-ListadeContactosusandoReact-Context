import { useNavigate, useParams } from "react-router-dom";
import { useReducer, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_DATA":
      return { ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function FormularioContacto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, dispatch] = useReducer(formReducer, initialState);


  useEffect(() => {
    const loadContact = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          "https://playground.4geeks.com/contact/agendas/fquesada/contacts"
        );
        if (!res.ok) throw new Error("No se pudo cargar contactos");
        const data = await res.json();


        const contact = data.contacts.find((c) => c.id === parseInt(id));
        if (contact) dispatch({ type: "SET_DATA", payload: contact });
      } catch (err) {
        console.error(err);
      }
    };
    loadContact();
  }, [id]);



  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      alert("Completa todos los campos antes de guardar.");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://playground.4geeks.com/contact/agendas/fquesada/contacts/${id}`
      : `https://playground.4geeks.com/contact/agendas/fquesada/contacts`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(id ? "Contacto actualizado" : "Contacto creado");
        dispatch({ type: "RESET" });
        navigate("/contacts");
      } else {
        alert("Error al guardar contacto");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container my-4">
      <h3>{id ? "Editar contacto" : "Nuevo contacto"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          placeholder="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          placeholder="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success mt-2">
          {id ? "Actualizar" : "Guardar"}
        </button>
        <button
          type="button"
          className="btn btn-info mt-2 "
          onClick={() => navigate("/")}
        >Home</button>
        </div>
      </form>

    </div>

  );
}
