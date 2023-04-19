
import React, {useState} from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';



const App = () => {
  const userData = [
    { id: 1, name: 'Marius', username: 'theNothing'},
    { id: 2, name: 'Niemet', username: 'brokeDev'},
  ]
//add data
  const [users, setUsers] = useState(userData)

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
}
//delete data
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    setEditing(false)
  }
//edit form
  const [editing, setEditing] = useState(false)
  const initialFormState = { id:null, name:'', username:''}
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const editRow = (user) =>{
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username})
  }

  const updateUser = (id, updatedUser) =>{
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser: user)))
  }

  return (
      <div className="container">
        <h1>CRUD Appliction avec les Hooks</h1>
        <div className="flex-row">
         {editing ? (
        <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser}/>
            </div>
          )}
       </div>
        <div className="flex-large">
          <h2>Liste des Utilisateur</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>          
        </div>
      </div>
      
    )
}

export default App;
