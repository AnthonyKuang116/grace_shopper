import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { CropSharp } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { storeCurrentUser, clearCurrentUser } from "../auth";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  formControl: {
    padding: theme.spacing(0, 0, 0, 0),
    minWidth: 120,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      marginLeft: theme.spacing(3),
    },
    alignItems: "left",
    justifyContent: "center",
    color: "white",
  },
}));

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Header = ({ products, userCart, currentUser, setCurrentUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [subCategory, setSubCategory] = useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [selectedUser, setSelectedUser] = useState("");
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  //List items for inside drawer...doesn't work
  const Items = () => {
    return (
      <div onClick={() => toggleDrawer(false)}>
        <List>
          {userCart ? (
            userCart.products.map((p) => {
              const product = products.find((product) => product.id === p.id);
              return (
                <ListItem key={p.id}>
                  {product.name} - {product.price} - {p.quantity}
                </ListItem>
              );
            })
          ) : (
            <ListItem>No Items</ListItem>
          )}
        </List>
      </div>
    );
  };

  const handleUserLogin = (event) => {
    storeCurrentUser(selectedUser);
    setCurrentUser(selectedUser);
  };

  const handleUserLogout = (event) => {
    clearCurrentUser();
    setCurrentUser(null);
    setSelectedUser(null);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  //Handles subcategory selections
  const handleSubCategoryChange = (event) => {
    event.preventDefault();
    setSubCategory(event.target.value);
  };

  //handles profile account popout
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Mobile view handles
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Purchase History</MenuItem>
      <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
    </Menu>
  );

  const allProducts = ["All Products"];
  const subCategoryFruit = [
    "Tropical",
    "Sub-Tropical",
    "Stone",
    "Pome",
    "Melons",
  ];
  const subCategoryVeg = [
    "Fungi",
    "Sprouts",
    "Root",
    "Bulbs",
    "Seeded",
    "Herbs",
    "Row-Crops",
    "Other",
  ];

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    setSelectedUser(currentUser);
    // console.log("Header level currentUser", currentUser)
  }, [currentUser]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Froot Loops
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id="">Categories</InputLabel>
            <Select
              multiple
              value={subCategory}
              onChange={handleSubCategoryChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              <optgroup label="All Products"></optgroup>
              {allProducts.map((all) => (
                <MenuItem key={all} value={all}>
                  <Checkbox checked={subCategory.indexOf(all) > -1} />
                  <ListItemText primary={all} />
                </MenuItem>
              ))}
              <optgroup label="Fruits"></optgroup>
              {subCategoryFruit.map((fruit) => (
                <MenuItem key={fruit} value={fruit}>
                  <Checkbox checked={subCategory.indexOf(fruit) > -1} />
                  <ListItemText primary={fruit} />
                </MenuItem>
              ))}
              <optgroup label="Vegetables"></optgroup>
              {subCategoryVeg.map((veg) => (
                <MenuItem key={veg} value={veg}>
                  <Checkbox checked={subCategory.indexOf(veg) > -1} />
                  <ListItemText primary={veg} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="cart of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => toggleDrawer(true)}
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
            <Drawer
              anchor={"right"}
              open={drawer}
              onClose={() => toggleDrawer(false)}
              width={"100px"}
            >
              <Items />
            </Drawer>
          </div>
          <div className={classes.sectionDesktop}>
            {currentUser ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={handleUserLogin}>
                Login
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="cart of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;
