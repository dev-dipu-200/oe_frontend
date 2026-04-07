type UniqueFieldOptions<T> = {
  fieldLabel: string;
  value: string;
  items: T[];
  getValue: (item: T) => string | null | undefined;
  getId: (item: T) => string | number | null | undefined;
  currentId?: string | number | null;
  normalize?: (value: string) => string;
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const validateFieldByName = (
  fieldName: string,
  rawValue: string | null | undefined
): string | null => {
  const value = String(rawValue ?? "").trim();

  if (!value) {
    return null;
  }

  const key = fieldName.toLowerCase();

  if (key === "mobile" || key === "mobile_number") {
    return /^\d{10}$/.test(onlyDigits(value))
      ? null
      : "Mobile number must be exactly 10 digits.";
  }

  if (key === "adhar" || key === "aadhar" || key === "aadhaar") {
    return /^\d{12}$/.test(onlyDigits(value))
      ? null
      : "Adhar number must be exactly 12 digits.";
  }

  if (key === "password") {
    return value.length >= 6 && value.length <= 10
      ? null
      : "Password must be 6 to 10 characters.";
  }

  return null;
};

export const validateUniqueField = <T>({
  fieldLabel,
  value,
  items,
  getValue,
  getId,
  currentId = null,
  normalize,
}: UniqueFieldOptions<T>): string | null => {
  const applyNormalize =
    normalize ?? ((incoming: string) => incoming.trim().toLowerCase());
  const normalizedValue = applyNormalize(String(value ?? ""));
  if (!normalizedValue) {
    return null;
  }

  const isDuplicate = items.some((item) => {
    const itemId = getId(item);
    if (currentId !== null && currentId !== undefined && itemId === currentId) {
      return false;
    }

    const itemValue = applyNormalize(String(getValue(item) ?? ""));
    return itemValue === normalizedValue;
  });

  return isDuplicate ? `${fieldLabel} must be unique.` : null;
};
