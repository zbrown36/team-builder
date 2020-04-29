import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import TeamMember from './components/Member';

function App() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState('');

  useEffect(() => {
    if (localStorage.getItem('teamMembers'))
      setTeamMembers(JSON.parse(localStorage.getItem('teamMembers')));
  }, []);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const addTeamMember = newMember => {
    setTeamMembers([...teamMembers, { ...newMember, id: teamMembers.length }]);
  };

  const editTeamMember = newMember => {
    setTeamMembers(
      teamMembers.map(member => {
        if (member.id === newMember.id) return newMember;
        else return member;
      })
    );
    setMemberToEdit('');
  };

  return (
    <div className='build-form'>
      <h1 className='title'>Team Builder</h1>
      <Form
        addMember={addTeamMember}
        editMember={editTeamMember}
        memberToEdit={memberToEdit}
      />
      <div className='member'>
        {teamMembers.map(member => {
          return (
            <TeamMember
              key={member.id}
              memberInfo={member}
              edit={setMemberToEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;