import css from './ContactList.module.css';

import PropTypes from 'prop-types';

import { Contact } from '../ContactItem/Contact.jsx';


export const ContactList = ({ contacts, handleRemoveContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }, index) => (
        <li key={id}>
          <Contact
            name={name}
            number={number}
            handleRemoveContact={handleRemoveContact}
            id={id}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleRemoveContact: PropTypes.func.isRequired,
  };