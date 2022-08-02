import { useMemo } from "react";

type Options = {
  value: string;
  label: string;
};

const NotesSelectOptions = () => {
  const options: Options[] = useMemo(
    () => [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Personal",
        value: "personal",
      },
    ],
    []
  );

  return (
    <>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};

export default NotesSelectOptions;
