import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useRef, useState } from 'react';

const SelectDropDownWithTextField = ({
  fetchOptions,
  sx,
  fullWidth = true,
  options = [],
  transformOption,
  allowFreeText = true,
  onChangeFreeText,
  onChange,
  ...props
}) => {
  const [customValue, setCustomValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const handleCustomValueChange = (event) => {
    onKeyDown(event);
    setCustomValue(event.target.value);
  };

  const handleEnter = () => {
    onChangeFreeText?.(customValue);
    setMenuOpen(false);
  };

  const onKeyDown = (e) => {
    e.stopPropagation();
  };
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <Select
        labelId="model-dropdown"
        id="model-dropdown"
        value={props.value}
        sx={{ width: '100%', padding: '0 !important' }}
        onChange={(e) => {
          onChange?.(options[e.target.value]);
          console.log(options[e.target.value]);
        }}
        renderValue={(value) => {
          return value;
        }}
        onOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        {options.map((m, i) => (
          <MenuItem key={i} value={i}>
            {m}
          </MenuItem>
        ))}
        {allowFreeText && (
          <MenuItem>
            <TextField
              fullWidth
              size="small"
              value={customValue}
              onClick={(e) => e.stopPropagation()}
              onChange={handleCustomValueChange}
              placeholder="Others"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleEnter}>
                      <span style={{ fontSize: '12px' }}>Enter</span>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  handleEnter();
                }
              }}
              ref={inputRef}
            />
          </MenuItem>
        )}
      </Select>
    </div>
  );
};

export default SelectDropDownWithTextField;
