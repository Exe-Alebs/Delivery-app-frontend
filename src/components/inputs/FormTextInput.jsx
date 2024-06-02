import TextField from '@mui/material/TextField';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { CopyPng } from '../../assets/assets';

const FormTextInput = ({
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
        width: '100%',
        display: 'flex',
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
        rows={rows}
        maxRows={maxRows}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
        error={errors}
        sx={{
          width: '100%',
          ...sx,
          '& fieldset': {
            outline: 'none',
            border: '0.7px solid #ccc',
          },
          '& .MuiInputBase-input': {
            background: 'white', // Set background to transparent
            borderRadius: '2px', // Example border radius
            height: '40px', // Example height
          },
          '& .Mui-error': {
            margin: 0,
            fontStyle: 'italic',
            fontSize: '10px',
            marginTop: '2px',
          },
          ...(disabled
            ? {
                backgroundColor: '#ededed',
                color: 'black',
              }
            : {}),
        }}
        InputProps={{
          endAdornment: showEndAdornment ? (
            <InputAdornment position="end">
              <IconButton edge="end">
                <CopyPng onClick={onClickSvg} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {/* {errors && <div className="error">{errors}</div>} */}
    </div>
  );
};

export default FormTextInput;
