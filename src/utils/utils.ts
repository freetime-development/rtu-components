import { useEffect } from 'react';
import { FieldErrors, get, useFormContext } from 'react-hook-form';

export function useFormError(name: string): string {
  const { formState } = useFormContext();

  const error = get(formState, name);

  return error ? error.message : '';
}

export function useScrollToError(errors: FieldErrors) {
  useEffect(() => {
    if (errors) {
      const errorsValues = Object.keys(errors);

      if (errorsValues.length > 0) {
        const elements = document.getElementsByName(errorsValues[0]);

        if (elements?.[0]) {
          elements[0].scrollIntoView({ behavior: 'smooth' });
          elements[0].focus();
        } else {
          // try find element by id
          const element = document.getElementById(errorsValues[0]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.focus();
          }
        }
      }
    }
  }, [errors]);
}
