const API_BASE = "https://playground.4geeks.com/contact/agendas/lucasurq11";

export async function getContacts() {
  const resp = await fetch(`${API_BASE}/contacts`);
  if (!resp.ok) throw new Error("Error fetching contacts");
  return resp.json();
}

export async function createContact(contactData) {
  const resp = await fetch(`${API_BASE}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  if (!resp.ok) throw new Error("Error creating contact");
  return resp.json();
}

export async function deleteContact(contactId) {
  const resp = await fetch(`${API_BASE}/contacts/${contactId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!resp.ok) throw new Error("Error deleting contact");
  return resp.json();
}
