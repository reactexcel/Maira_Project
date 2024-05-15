import { Menu, MenuItem } from "@mui/material";
import { instance } from "../axiosInstance/instance";

function DropdownMenu({ anchorEl, setAnchorEl, getData, type, id }) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  const optionData = ["Ready", "Do not have", "Need improvement"];
  const body = {
    "Ready": "ready",
    "Do not have": "doNotHave",
    "Need improvement": "needsImprovement",
  };
  const handleMenuItemClick = async (option) => {
    const payload = {
      type: type,
      [body[option]]: true,
    };
    try {
      await instance.put(`api/data-quality/data-matrix/${id}`, payload);
    } catch (error) {
      console.log(error);
    }
    getData();
    handleClose();
  };
  return (
    <div>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {optionData.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(option)}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;
