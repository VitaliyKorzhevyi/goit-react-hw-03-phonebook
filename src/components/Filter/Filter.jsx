import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ handleFilterChange, value }) => {
  return (
    <>
      <label className={css.label}>
        <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        placeholder="John Berezovskii"
        value={value}
        onChange={handleFilterChange}
      />
      </label>
    </>
  );
};

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};