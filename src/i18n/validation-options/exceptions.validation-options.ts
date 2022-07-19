import { ValidationArguments } from 'class-validator';

export const intValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.IsInt#${JSON.stringify({
      field: v.property,
    })}`,
};

export const numberValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.IsNumber#${JSON.stringify({
      field: v.property,
    })}`,
};

export const stringValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.IsString#${JSON.stringify({
      field: v.property,
    })}`,
};

export const arrayValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.IsArray#${JSON.stringify({
      field: v.property,
    })}`,
};

export const objectValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.IsObject#${JSON.stringify({
      field: v.property,
    })}`,
};

export const minValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.Min#${JSON.stringify({
      field: v.property,
      value: v.constraints[0],
    })}`,
};

export const maxValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.Max#${JSON.stringify({
      field: v.property,
      value: v.constraints[0],
    })}`,
};

export const minLengthValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.MinLength#${JSON.stringify({
      field: v.property,
      value: v.constraints[0],
    })}`,
};

export const maxLengthValidationOptions = {
  message: (v: ValidationArguments) =>
    `exceptions.MaxLength#${JSON.stringify({
      field: v.property,
      value: v.constraints[0],
    })}`,
};
