import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const SearchTypeRadioGroup = ({
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
          value={bonusQuery}
          onChange={onChangeBonusQuery}
        ></TextField>
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

  const fetchBooks = () => {
    console.log("bonus query: " + bonusQuery);
    console.log("search type: " + searchType);
    console.log("search: " + search);
    fetch(
      `/api/search?q=${search}${
        bonusQuery ? `&${searchType.toLowerCase()}=${bonusQuery}` : ""
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.items);
        setSearchResults(data.items);
      })
      .catch((err) => {
        alert(err);
      });
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
      <Button
        sx={{ ml: 1, backgroundColor: "rgb(33, 112, 33)" }}
        variant="contained"
        onClick={fetchBooks}
      >
        Search
      </Button>
    </Box>
  );
};
