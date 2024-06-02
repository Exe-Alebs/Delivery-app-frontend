import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const PasswordInput = ({
  id,
  name,
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
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
      }}
    >
      <TextField
        variant="outlined"
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        // label={label ?? 'Password'}
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
            // border: '0.7px solid #A5C5E0',
          },
          '& .MuiInputBase-root': {
            borderRadius: 2,
            height: '40px',
          },
          '& .Mui-error': {
            margin: 0,
            fontStyle: 'italic',
            fontSize: '10px',
            marginTop: '2px',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default PasswordInput;
