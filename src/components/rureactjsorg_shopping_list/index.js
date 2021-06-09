//class ShoppingList extends React.Component {
const ShoppingList = ({name, list}) =>   
(
      <div>
        <h1>Список покупок для {name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
        <ul>
          { list.map(name => (<li>{name}</li>)) }
        </ul>
      </div>
);

export default ShoppingList;
//module.exports = {ShoppingList};