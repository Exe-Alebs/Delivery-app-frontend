import TextField from "@mui/material/TextField";
import React from "react";

const numberTypes = Object.freeze({
  number: /\d|\./,
  integer: /\d/,
});
const isNumberType = (type) => Object.keys(numberTypes).includes(type);
const MultiLineInput = ({
  id,
  name,
  type,
  label,
  required,
  placeholder,
  onChange,
  onBlur,
  value,
  errors,
  disabled,
  multiLine,
  maxRows,
  rows,
  sx,
  fullWidth,
  className,
  showEndAdornment,
  onClickSvg,
  ...props
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
      className={className}
    >
      <TextField
        variant="outlined"
        id={id}
        name={name}
        type={type}
        // label={label}
        required={required}
        onChange={onChange}
        multiline={multiLine}
        fullWidth={fullWidth}
        size="small"
        rows={7}
        maxRows={maxRows}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
        error={errors}
        sx={{
          width: "100%",
          ...sx,
        }}
        {...props}
      />

      {/*{errors && <div className="error">{errors}</div>}*/}
    </div>
  );
};

export default MultiLineInput;
