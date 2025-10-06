import React from "react";

type Contact = {
  name: string;
  address: string;
  tag?: string;
};

const AddressBook = ({ setContacts }: { setContacts: (contacts: Contact[]) => void }) => {
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
    </div>
  );
};

export default AddressBook;
