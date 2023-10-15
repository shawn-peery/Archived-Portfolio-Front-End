export const isNullOrUndefined = (unknownValue: unknown): unknownValue is null | undefined => {
  return unknownValue === undefined || unknownValue === null;
};

//https://stackoverflow.com/questions/54736011/custom-typescript-type-guard-for-not-undefined-in-separate-function#answer-62753258

export const isNotNullNorUndefined = <T>(unknownValue: T | undefined | null): unknownValue is T => {
  return unknownValue !== undefined && unknownValue !== null;
};

export const isNullOrUndefinedOrEmptyString = (
  unknownValue: unknown,
): unknownValue is null | undefined | '' => {
  if (typeof unknownValue === 'string') {
    if (unknownValue.trim() === '') {
      return true;
    }
  }

  return unknownValue === undefined || unknownValue === null;
};

export const isNotNullNorUndefinedNorEmptyString = <T>(
  unknownValue: T | undefined | null | '',
): unknownValue is T => {
  if (typeof unknownValue === 'string') {
    if (unknownValue.trim() === '') {
      return false;
    }
  }

  return unknownValue !== undefined && unknownValue !== null;
};
