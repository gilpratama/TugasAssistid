import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from 'axios';
import { addEditUsers } from "../actions/userActions";
import { TextField, Button, Grid } from "@material-ui/core";
// import Autocomplete from '@material-ui/lab/Autocomplete';

class AddEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        namaLengkap: "",
        kewarganegaraan: "",
        posisi: "",
        alamat: "",
        kecamatan: "",
        kota: "",
        provinsi: "",
      },
      open: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const requestOptions = {
      body: [{
        namaLengkap: this.state.namaLengkap,
        kewarganegaraan: this.state.kewarganegaraan,
        posisi: this.state.posisi,
        alamat: this.state.alamat,
      }],
    };
    const user = {
      namaLengkap: this.state.namaLengkap,
      kewarganegaraan: this.state.kewarganegaraan,
      posisi: this.state.posisi,
      alamat: this.state.alamat,
    };
    axios.post("https://reqaid.com/api/FakePosts", requestOptions).then(
      (res) => {
        console.log(res);
        console.log("Berhasil");
      }
    );
  };

  render() {
    const { namaLengkap, kewarganegaraan, posisi, alamat } = this.state;
    return (
      <Grid>
        <TextField
          label="Nama Lengkap" // Label acts like placeholder
          onChange={this.handleChange}
          value={namaLengkap}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Kewarganegaraan" // Label acts like placeholder
          onChange={this.handleChange}
          value={kewarganegaraan}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Posisi" // Label acts like placeholder
          onChange={this.handleChange}
          value={posisi}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Alamat" // Label acts like placeholder
          onChange={this.handleChange}
          value={alamat}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={fetchProvinsi.map((option) => option.namaLengkap)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provinsi"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        /> */}

        <Button
          type="submit"
          variant="contained"
          onClick={this.handleSubmit}
          color="primary"
          style={{ margin: "1em", float: "right" }}
        >
          Simpan
        </Button>
      </Grid>
    );
  }
}

AddEditUser.propTypes = {
  addNewUser: PropTypes.func,
  snackBarMessage: PropTypes.string,
  snackBarVariant: PropTypes.string,
};

const mapStateToProps = (state) => ({
  snackBarMessage: state.utils.message,
  snackBarVariant: state.utils.variant,
});

export default connect(mapStateToProps, { addNewUser: addEditUsers })(
  AddEditUser
);
