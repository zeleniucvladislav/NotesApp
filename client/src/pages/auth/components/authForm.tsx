import { useForm, SubmitHandler } from "react-hook-form";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./authForm.module.scss";

type Props = {
  fields: Array<Field>;
  handleRequest: (data: any) => void;
  buttonText: string;
};

type Field = {
  type: string;
  name: string;
  validation: any;
  label: string;
};

export const AuthForm = ({ fields, handleRequest, buttonText }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    handleRequest(data);
  };

  const passMatch = {
    validate: (val: string) => {
      if (watch("password") !== val) {
        return "Passwords don't match";
      }
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {fields.map((field: Field) => {
        const validation = field.validation;
        const error = errors[field.name]?.message as any;

        if (field.name === "repeatPwd") {
          Object.assign(validation, passMatch);
        }

        return (
          <div key={field.name}>
            <label className={styles.field}>
              {field.label}
              <input
                className={`${styles.input} ${
                  errors[field.name] && styles.input_error
                }`}
                type={field.type}
                {...register(field.name, validation)}
              />
            </label>
            <p className={styles.field__error}>{error}</p>
          </div>
        );
      })}
      <button type="submit" className={styles.form__button}>
        {buttonText}
        <RiSendPlaneFill />
      </button>
    </form>
  );
};
