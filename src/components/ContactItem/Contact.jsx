import css from './Contact.module.css';
import PropTypes from 'prop-types';

export const Contact = ({ name, number, handleRemoveContact, id, index }) => {
  return (
    <>
      <p className={css.indexName}>
        <span>{index + 1}.</span>
        <b>
        {name}:</b>
      </p>
      <div className={css.numberBtn}>
        {' '}
        <p href={`tel: ${number}`}>{number}</p>
        <button
          className={css.btn}
          type="button"
          onClick={() => handleRemoveContact(id)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleRemoveContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};