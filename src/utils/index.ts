/* eslint-disable @typescript-eslint/no-explicit-any */
export const createFormData = (data: object): FormData => {
  const formData = new FormData();

  const appendToFormData = (obj: any, parentKey?: string): void => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        appendToFormData(value, formKey);
      } else {
        formData.append(formKey, value);
      }
    });
  };

  appendToFormData(data);

  return formData;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return `${year}-${month}-${day} ${strTime}`;
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
