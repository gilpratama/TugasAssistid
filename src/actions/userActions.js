import { FETCH_USERS, ADD_USER, EDIT_USER, DELETE_USER, FETCH_PROVINSI } from "./types";

export const fetchUsers = () => dispatch => {
    fetch('https://reqaid.com/api/FakePosts')
    .then(res => res.json())
    .then(pegawai => {
        pegawai = pegawai.map(peg => {
            const { id, namaLengkap, kewarganegaraan, posisi, alamat } = peg;
            return {
                id,
                namaLengkap,
                kewarganegaraan,
                posisi,
                alamat
            };
        });
        dispatch({
            type: FETCH_USERS,
            payload: pegawai
        });
    })
    .catch(err => console.log(err));
};

export const fetchProvinsi = () => dispatch => {
    fetch('https://reqaid.com/api/FakePosts')
    .then(res => res.json())
    .then(provinsi => {
        provinsi = provinsi.map(prov => {
            const { provinsi, id, nama } = prov;
            return {
                provinsi,
                id,
                nama
            };
        });
        dispatch({
            type: FETCH_PROVINSI,
            payload: provinsi
        });
    })
    .catch(err => console.log(err));
};

export const addEditUsers = (userData) => dispatch => {
    if (!userData[0].edit) {
        dispatch({
            type: ADD_USER,
            payload: userData
        });
    } else {
        dispatch({
            type: EDIT_USER,
            payload: userData
        });
    }
};

export const removeUsers = (usersNameArr) => dispatch => {
    dispatch({
        type: DELETE_USER,
        payload: usersNameArr 
    });
};
