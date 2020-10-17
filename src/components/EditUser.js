import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { addEditUsers } from "../actions/userActions";
import { TextField, Button, Grid, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaLengkap: "",
      kewarganegaraan: "",
      posisi: "",
      alamat: "",
      kecamatan: "",
      kota: "",
      provinsi: "",
      open: false,
      list: [],
      listProv: [],
      listKota: [],
      listKecamatan: [],
    };
  }

  componentDidMount() {
    axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then((res) => {
      const prov = res.data.provinsi;
      this.setState({ listProv: prov });
    });
  }

  handleChange = (event) => {
    const { name } = event.target;
    if (name === 'kota') {
      axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${this.state.listKota.find(a => a.nama === event.target.value).id}`
      ).then(res => {
          const kecamatan = res.data.kecamatan;
          this.setState({ listKecamatan: kecamatan });
      })
      this.setState({
        [name]: event.target.value,
      });
    }
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleAutoComplete = (event, values) => {
    axios.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${this.state.listProv.find(a => a.nama === values).id}`
    ).then(res => {
        const kota = res.data.kota_kabupaten;
        this.setState({ listKota: kota });
    })
    this.setState({
      provinsi: values,
    });
  };
  
  handleSubmit = () => {
    const user = {
      namaLengkap: this.state.namaLengkap,
      kewarganegaraan: this.state.kewarganegaraan,
      posisi: this.state.posisi,
      alamat: this.state.alamat,
    };
    const res = axios.post("https://reqaid.com/api/FakePosts", user);
    this.setState({ list: res });
  };

  render() {
    const {
      namaLengkap,
      kewarganegaraan,
      posisi,
      alamat,
      listProv,
      listKota,
      listKecamatan,
      kecamatan,
      kota,
    } = this.state;
    return (
      <Grid>
        <TextField
          label="Nama Lengkap" // Label acts like placeholder
          onChange={this.handleChange}
          value={namaLengkap}
          fullWidth
          name="namaLengkap"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Kewarganegaraan" // Label acts like placeholder
          onChange={this.handleChange}
          value={kewarganegaraan}
          fullWidth
          name="kewarganegaraan"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Posisi" // Label acts like placeholder
          onChange={this.handleChange}
          value={posisi}
          fullWidth
          name="posisi"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Alamat" // Label acts like placeholder
          onChange={this.handleChange}
          value={alamat}
          fullWidth
          name="alamat"
          margin="normal"
          variant="outlined"
        />

        <Autocomplete
          freeSolo
          onChange={this.handleAutoComplete}
          disableClearable
          options={listProv.map((option) => option.nama)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provinsi"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />

        <TextField
          fullWidth
          select
          label="Kota"
          name="kota"
          value={kota}
          onChange={this.handleChange}
          helperText="Pilih Kota"
        >
          {listKota.map((option) => (
            <MenuItem key={option.nama} value={option.nama}>
              {option.nama}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Kecamatan"
          name="kecamatan"
          value={kecamatan}
          onChange={this.handleChange}
          helperText="Pilih Kecamatan"
        >
          {listKecamatan.map((option) => (
            <MenuItem key={option.nama} value={option.nama}>
              {option.nama}
            </MenuItem>
          ))}
        </TextField>

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

EditUser.propTypes = {
  addNewUser: PropTypes.func,
  snackBarMessage: PropTypes.string,
  snackBarVariant: PropTypes.string,
};

const mapStateToProps = (state) => ({
  snackBarMessage: state.utils.message,
  snackBarVariant: state.utils.variant,
});

export default connect(mapStateToProps, { addNewUser: addEditUsers })(
  AddUser
);
