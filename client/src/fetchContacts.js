export const fetchContacts = async () => {
  try {
    const response = await fetch("http://localhost:8080/contacts");
    if (!response.ok) {
      throw new Error("Error fetching contacts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
  }
};
