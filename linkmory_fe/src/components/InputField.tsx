import React from 'react';
import styles from './UpdateInfo.module.css';

interface InputFieldProps {
  icon: string;
  placeholder: string;
  type: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, type, id }) => {
  return (
    <div className={styles.inputWrapper}>
      <img src={icon} alt="" className={styles.inputIcon} />
      <label htmlFor={id} className={styles['visually-hidden']}>{placeholder}</label>
      <input
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;