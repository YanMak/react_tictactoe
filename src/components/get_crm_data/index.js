const UsersList = ({ list }) => {
  
  return (
  <ul>
    { list.map(name => (<li>{name}</li>)) }
  </ul>
  );
} 

export default UsersList;
