import React from 'react';
import './forms.css';
import { getFieldError, getNestedProperty } from './../../utils/utils';
import { Grid } from '@mui/material';

const FormikField = ({
  name,
  formikBag,
  Component,
  defaultValue,
  select,
  required,
  sm = 12,
  md = 6,
  hideFieldLabel,
  noFieldLabel,
  className,
  rawFieldError,
  actions,
  noPlaceholder,
  labelAsPlaceholder,
  placeholder,
  mainWrapClassName,
  label,
  error,
  ...props
}) => {
  const getProp = (prop) => getNestedProperty(formikBag?.[prop], name);

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (labelAsPlaceholder) return;
    if (noPlaceholder) return '';
    return '';
  };

  return (
    <Grid
      sm={sm}
      md={md}
      style={{ marginTop: '8px' }}
      item
      className={className ?? 'mb-3'}
    >
      {!noFieldLabel &&
        (label ? (
          <div
            style={{
              fontSize: '14px',
            }}
          >
            <label
              htmlFor={name}
              className={`${required && !hideFieldLabel ? 'required' : ''}`}
            >
              {hideFieldLabel ? <pre> </pre> : label}
            </label>
          </div>
        ) : null)}
      <div className={mainWrapClassName ?? ''}>
        <Component
          name={name}
          placeholder={getPlaceholder()}
          value={getProp('values') ?? defaultValue ?? ''}
          onChange={formikBag?.handleChange}
          onBlur={formikBag?.handleBlur}
          touched={getProp('touched')}
          errors={getFieldError(formikBag, name, rawFieldError)}
          defaultValue={defaultValue}
          select={select}
          required={required}
          formikBag={formikBag}
          sm={sm}
          md={md}
          {...props}
        />
      </div>
      {formikBag?.errors[name] && formikBag?.touched[name] && (
        <div
          className="error"
          style={{ fontSize: '11px', margin: 0, padding: 0 }}
        >
          {formikBag.errors[name]}
        </div>
      )}
    </Grid>
  );
};

export default FormikField;
