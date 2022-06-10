import { useForm, SubmitHandler } from "react-hook-form";
import { RiSendPlaneFill } from "react-icons/ri";
import { ModalFields } from "types/modalFields.type";

import styles from "./noteForm.module.scss";

type Props = {
  handleRequest: any;
  submitText: string;
  defaultValues: { nonpublic: boolean; title: string; text: string };
};

const NoteForm = ({ handleRequest, submitText, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ModalFields>({ defaultValues: defaultValues });

  const onSubmit: SubmitHandler<ModalFields> = async (data: ModalFields) => {
    handleRequest(data);
  };

  const textLength = watch("text").length;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <label className={styles.field}>
          Title
          <input
            type="text"
            className={`${styles.input} ${errors.title && styles.input_error}`}
            {...register("title", { required: "This field is required" })}
          />
        </label>
        <p className={styles.field__error}>{errors.title?.message}</p>

        <label className={styles.field}>
          Text
          <textarea
            className={`${styles.input} ${errors.text && styles.input_error}`}
            {...register("text", {
              required: "This field is required",
              maxLength: {
                value: 3000,
                message: `This field should not exceed 3000 characters. Current characters length is ${textLength}`,
              },
            })}
          />
        </label>
        <p className={styles.field__error}>{errors.text?.message}</p>

        <label className={styles.field}>Private</label>
        <input
          type="checkbox"
          className={styles.switch}
          checked={watch("nonpublic")}
          {...register("nonpublic")}
        />
      </div>

      <button type="submit" className={styles.form__button}>
        {submitText}
        <RiSendPlaneFill />
      </button>
    </form>
  );
};

export default NoteForm;
