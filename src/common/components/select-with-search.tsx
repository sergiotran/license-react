import { ListSubheader, MenuItem, SelectProps } from "@mui/material";
import React from "react";
import { SecondaryInput } from "./inputs";
import { useAppSelector } from "@/app/store";
import { selectUserFilterStatusSearchText } from "@/features/users/user-slice";
import Select from "./select";
import useUser from "../hooks/use-user";

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
    const { searchValue } = useUser();

    const displayedOptions = React.useMemo(
      () =>
        data.filter(
          (item) =>
            item.value.toLowerCase().indexOf(searchValue?.toLowerCase() ?? "") >
            -1
        ),
      [searchValue]
    );

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef.current]);

    return (
      <Select ref={ref} {...selectProps}>
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
