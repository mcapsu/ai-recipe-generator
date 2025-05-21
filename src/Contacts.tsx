import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

type Contact = Schema["Contact"]["type"];

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, errors } = await client.models.Contact.list();
        if (errors) {
          console.error("List errors:", errors);
        } else {
          setContacts(data);
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div>
      <h2>Saved Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
