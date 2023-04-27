import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const schema = yup.object().shape({
  name: yup.string().matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, 'Name is not valid').required(),
  number: yup.string().matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, 'Number is not valid').required(),
});

const initialValues = { name: '', number: '' };

export function ContactForm({ handleFormSubmit }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        <Form className={css.form}>
          <label className={css.label}>
            <p>Name</p>
            <Field type="text" name="name" placeholder="John Berezovskii" className={css.field}/>
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            <p>Phone number</p>
            <Field type="tel" name="number" placeholder="+380-00-000-00-00" className={css.field}/>
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.btn}>
            ADD
          </button>
        </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};