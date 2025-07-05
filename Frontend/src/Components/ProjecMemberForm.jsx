import React, { useState } from 'react';
import DropDown from '../ui/DropDown';
import Input from '../ui/Input';

const ProjectMemberForm = ({ users, onAdd }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('MEMBER');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    onAdd({ userId: selectedUser, role });
    setSelectedUser('');
    setRole('MEMBER');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Add Project Member</h2>
      <div className='mb-2 '>
        <Input text={"Email"} type={'email'} />
      </div>
      <div
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full border  rounded mb-2"
      >
       <DropDown />
      </div>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      >
        <option value="ADMIN">Admin</option>
        <option value="MEMBER">Member</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Member
      </button>
    </form>
  );
};

export default ProjectMemberForm;
