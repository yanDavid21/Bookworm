import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const SearchTypeRadioGroup = ({
  searchType,
  setSearchType,
  bonusQuery,
  setBonusQuery,
}) => {
  const onChange = (e) => {
    setSearchType(e.target.value);
  };

  const onChangeBonusQuery = (e) => {
    setBonusQuery(e.target.value);
  };
  return (
    <FormControl component="fieldset">
      <div className="flex-horizontal flex-center">
        <RadioGroup
          row
          aria-label="Search Types"
          name="row-radio-buttons-group"
          onChange={onChange}
          value={searchType}
        >
          <FormControlLabel value="ISBN" control={<Radio />} label="ISBN" />
          <FormControlLabel value="Title" control={<Radio />} label="Title" />
          <FormControlLabel value="Author" control={<Radio />} label="Author" />
          <FormControlLabel
            value="Subject"
            control={<Radio />}
            label="Subject"
          />
          <FormControlLabel
            value="Publisher"
            control={<Radio />}
            label="Publisher"
          />
        </RadioGroup>
        <TextField
          size="small"
          placeholder="Advanced Query"
          value={bonusQuery}
          onChange={onChangeBonusQuery}
        />
      </div>
    </FormControl>
  );
};

export const SearchField = ({
  search,
  setSearch,
  searchType,
  setSearchResults,
  bonusQuery,
}) => {
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
      <SearchIcon
        sx={{ color: "action.active", mr: 1, my: 0.5 }}
        fontSize="large"
      />
      <TextField
        fullWidth
        label="Search for your faves :)"
        id="fullWidth"
        value={search}
        onChange={onChange}
      />
      <Link
        to={`/search?${search ? "q=" + search : ""}${
          searchType ? "&searchType=" + searchType : ""
        }${bonusQuery ? "&bonusQ=" + bonusQuery : ""}`}
        className="no-text-decoration"
      >
        <Button
          sx={{ ml: 1, backgroundColor: "rgb(33, 112, 33)" }}
          variant="contained"
        >
          Search
        </Button>
      </Link>
    </Box>
  );
};
