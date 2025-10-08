// Ejemplo para crear un contacto
const createContact = async (newContact) => {
  try {
    const res = await fetch("https://playground.4geeks.com/contact/agendas/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });
    if (!res.ok) throw new Error("Error al crear contacto");
    const data = await res.json();
    console.log("Contacto creado:", data);
  } catch (error) {
    console.error(error);
  }
};

