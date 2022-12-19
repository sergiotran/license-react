import {
  ListSubheader,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { SecondaryInput } from "./inputs";
import { useAppSelector } from '@/app/store';
import { selectUserFilterStatusSearchText } from '@/features/users/user-slice';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  searchOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} & SelectProps;

const SelectWithSearch: React.FC<Props> = React.forwardRef(
  function _SelectWithSearch(props, ref) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { data, searchOnChange, ...selectProps } = props!;
    const searchValue = useAppSelector(selectUserFilterStatusSearchText);

    const displayedOptions = React.useMemo(() => data.filter((item) => item.value.toLowerCase().indexOf(searchValue?.toLowerCase() ?? '') > -1), [searchValue]);

    React.useEffect(() => {
      if(inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef.current])

    return (
      <Select
        ref={ref}
        {...selectProps}
        sx={{
          backgroundColor: "#fff",
          height: "40px",
          fontSize: "14px",
          "& .MuiOutlinedInput-notchedOutline": {
            display: "none",
          },
          "& .MuiSelect-select": {
            minHeight: "auto",
            padding: "6px 12px",
          },
        }}
      >
        <ListSubheader sx={{ paddingX: 1, paddingBottom: 1 }}>
          <SecondaryInput
            size="small"
            autoFocus
            placeholder="Type to search..."
            fullWidth
            inputRef={inputRef}
            onChange={searchOnChange}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </ListSubheader>
        {displayedOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

export default React.memo(SelectWithSearch);
