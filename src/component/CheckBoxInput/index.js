import * as React from "react";
import TextField from "@mui/material/TextField";
import CheckBox from "@mui/icons-material/CheckBox";
import CropSquare from "@mui/icons-material/CropSquare";
import { useState } from "react";
import { useWorkspaceDispatch } from "src/context/workspace.context";

const CheckBoxInput = ({
  title = "",
  onChangeInput = () => {},
  onbox = () => {},
}) => {
  // const workspaceDispatch = useWorkspaceDispatch();
  const [checked, setChecked] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const [value, setValue] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked);
    setChecked(!checked);
    onbox(isChecked);
  };

  // React.useEffect(() => {
  //   workspaceDispatch({ type: "", payload: value });
  // }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div onClick={handleCheckboxChange}>
        {checked ? (
          <CheckBox
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={{ color: "#000", fontSize: 15, margin: 10 }}
          />
        ) : (
          <CropSquare style={{ color: "#000", fontSize: 15, margin: 10 }} />
        )}
      </div>

      <TextField
        onChange={(e) => {
          setValue(e.target.value);
          onChangeInput(e);
        }}
        disabled={!isChecked}
        type="number"
        value={value}
        sx={{ marginY: 1.5, width: "100%" }}
        id={title}
        label={title}
        variant="outlined"
        size="small"
      />
    </div>
  );
};

export default CheckBoxInput;
