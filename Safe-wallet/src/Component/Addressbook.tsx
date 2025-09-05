import React, { useState } from "react";

type Contact = {
  name: string;
  address: string;
  tag?: string;
};

const AddressBook = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n");
    const parsedContacts: Contact[] = lines
      .map((line) => {
        const [name, address, tag] = line.split(",");
        return { name: name.trim(), address: address.trim(), tag: tag?.trim() };
      })
      .filter((c) => c.name && c.address);

    setContacts(parsedContacts);
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Address Book</h2>
      <input type="file" accept=".csv" onChange={handleUpload} />
      <ul className="mt-4 space-y-2">
        {contacts.map((contact, index) => (
          <li key={index} className="border p-2 rounded">
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Address:</strong> {contact.address}</p>
            {contact.tag && <p><strong>Tag:</strong> {contact.tag}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressBook;
