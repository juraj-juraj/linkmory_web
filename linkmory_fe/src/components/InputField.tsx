import styles from './UpdateInfo.module.css';

interface InputFieldProps {
  icon: string;
  placeholder: string;
  type: string;
  id: string;
  default_value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ icon, placeholder, type, id, default_value, onChange}: InputFieldProps) {
  return (
    <div className={styles.inputWrapper}>
      <img src={icon} alt="" className={styles.inputIcon} />
      <label htmlFor={id} className={styles['visually-hidden']}>{placeholder}</label>
      <input
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        defaultValue={default_value}
        autoCapitalize="off"
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;