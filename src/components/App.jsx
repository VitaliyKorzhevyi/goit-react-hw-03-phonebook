import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //викликається при надсиланні форми для додавання нового контакту до списку контактів
  handleFormSubmit = (values, { resetForm }) => {
    const contact = { id: nanoid(), ...values }; //Створює новий контактний об'єкт, використовуючи значення, отримані
    //  з форми, і генерує унікальний ідентифікатор контакту за допомогою функції nanoid.

    if (
      this.state.contacts.some(
        c => c.name.toLowerCase() === contact.name.toLowerCase() // якщо ім'я, яке вже є в масиві відповіє значенню яке я ввів, то
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    } //Перевіряє, чи існує контакт із таким же ім'ям у списку контактів. Якщо існує, виводиться попередження та метод завершується.

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    })); //Якщо контакт не існує, він додається до списку контактів, використовуючи метод setState.
    resetForm(); //Значения формы сбрасываются с помощью переданной функции resetForm.
  };

  //викликається при натисканні на кнопку видалення контакту зі списку контактів. Він видаляє контакт зі списку за допомогою методу setState.
  handleRemoveContact = ContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== ContactId),
    }));
  };

  //викликається при зміні значення поля фільтрації. Він отримує нове значення поля та встановлює 
  // його в поле filter стану компонента за допомогою методу setState.
  handleFilterChange = ({ currentTarget }) => {
    const name = currentTarget.value.trim();
    this.setState({ filter: name });
  };

  //повертає список контактів, відфільтрований за рядком filter.
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    // в данному випадку я спробував використати регулярний вираз, який повертає лише ті об'єкти, які містять рядок filter, незалежно від регістру символів
    const regexp = new RegExp(filter, 'i');
    return contacts.filter(({ name }) => regexp.test(name));
  };


  render() {
    const { filter } = this.state;
    const getFilteredContacts = this.getFilteredContacts();
    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm handleFormSubmit={this.handleFormSubmit} />

        <h2>Contacts</h2>
        <Filter handleFilterChange={this.handleFilterChange} value={filter} />
        {getFilteredContacts.length !== 0 ? (
          <ContactList
            contacts={getFilteredContacts}
            handleRemoveContact={this.handleRemoveContact}
          />
        ) : (
          <h2 className={css.noContact}>There are no contacts in the list</h2>
        )}
      </div>
    );
  }
}