import { ArrowDropDown, HourglassEmpty } from '@mui/icons-material';
import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const SelectDropDown = ({
  fetchOptions,
  sx,
  fullWidth = true,
  options = [],
  transformOption,
  ...props
}) => {
  const displayItems = () => {
    return options.map((item) => (
      <MenuItem key={item._id ?? item} value={item || item._id}>
        {item.title || item}
      </MenuItem>
    ));
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
        size="small"
        name={props.name}
        className={`${props.disabled ? 'text-center' : ''} ${props.className}`}
        error={props.error}
        onBlur={props.onBlur}
        label={props.label}
        select
        disabled={props.disabled}
        fullWidth={fullWidth}
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
        helperText={props?.helperText ?? props.error ?? ''}
        onChange={(event) => {
          if (props.onChange) {
            props.onChange(event.target.value);
          }
        }}
        value={props.value ?? options ?? ''}
        {...props.overrideProps}
        SelectProps={{
          IconComponent: props.loading
            ? () => <HourglassEmpty className="mr-1" />
            : !props.disabled
            ? ArrowDropDown
            : null,
          renderValue: () => {
            if (props.value === '' || !props.value) {
              return (
                <div className="text-muted w-full">
                  {props.placeholder ?? ''}
                </div>
              );
            } else {
              return props.value.title ?? props.value;
            }
          },
          displayEmpty: true,
          ...props?.overrideProps?.SelectProps,
        }}
      >
        {displayItems()}
      </TextField>
      {props.error && <div className="error">{props.error}</div>}
    </div>
  );
};

export default SelectDropDown;
