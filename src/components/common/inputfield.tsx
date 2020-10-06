import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import styles from '../../styles/light/login.module.css';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  textarea?: boolean;
};

const Input = (props: any) => <input {...props} />;

const TextArea = (props: any) => <textarea {...props} />;

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = TextArea;
  }
  const [field, { error }] = useField(props);

  if (props.className)
    return (
      <React.Fragment>
        <InputOrTextarea {...field} {...props} id={field.name} />
        {/* {error ? <div className={styles.error}>{error}</div> : null} */}
      </React.Fragment>
    );
  else
    return (
      <div className={styles.inputContainer}>
        <InputOrTextarea {...field} {...props} id={field.name} />
        {error ? <div className={styles.error}>{error}</div> : null}
      </div>
    );
};
