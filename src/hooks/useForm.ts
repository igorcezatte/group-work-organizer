import React from 'react';

type SerializableValues = string | boolean | number | null | undefined | Date;

type UseFormParams<TFormValues> = {
  initialValues: TFormValues;
};

type HandleSubmit<TFormValues> = (formValues: TFormValues) => void;

export function useForm<TFormValues = Record<string, SerializableValues>>({
  initialValues,
}: UseFormParams<TFormValues>) {
  const [formValues, setFormValues] =
    React.useState<TFormValues>(initialValues);

  const onSubmit = React.useCallback(
    (handleSubmit: HandleSubmit<TFormValues>) =>
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(formValues);
      },
    [formValues]
  );

  const updateFormValues = (
    newFormValues: Record<string, SerializableValues>
  ) =>
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      ...newFormValues,
    }));

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback((event) => {
    updateFormValues({ [event.currentTarget.name]: event.currentTarget.value });
  }, []);

  const setFieldValue = React.useCallback(
    (field: keyof TFormValues, value: SerializableValues) => {
      updateFormValues({ [field]: value });
    },
    []
  );

  return {
    formValues,
    setFieldValue,
    handleChange,
    onSubmit,
  };
}
