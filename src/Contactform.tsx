import { useState, FormEvent } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>({
    authMode: 'userPool',
  });

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const { data, errors } = await client.models.Contact.create({
        ...form,
      });
  
      console.log("Create result:", { data, errors });
      console.log("Client configuration:", client);
  
      if (errors && errors.length > 0) {
        alert("Error creating contact: " + JSON.stringify(errors, null, 2));
      } else {
        setSubmitted(true);
        setForm({ firstName: '', lastName: '', phone: '', email: '' });
        alert("Contact created successfully!");
        alert( JSON.stringify(client, null, 2));
      }
    } catch (err) {
      console.error("Create threw exception:", err);
      alert("Create threw an exception: " + JSON.stringify(err));
  }
};
  
  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Save Contact</button>
      </form>
      {submitted && <p style={{ color: 'green' }}>Contact saved Mofo!</p>}
    </div>
  );
}
