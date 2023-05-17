const makeProvince = async () => {
    const provinces = [];
    let province = {};
    const res = await fetch('./provinsi.json')
    const data = await res.json();
    Object.keys(data).forEach((key, val) => {
        province = {
            'id_provinsi': `${data[key]['kode']['id_provinsi']}`,
            'nama_provinsi': data[key]['provinsi']
        }
        provinces.push(province);
    })
    console.log(provinces);
}

const makeCity = async () => {
    const cities = [];
    let city = {};
    let id_kota = '';
    let id_provinsi = '';
    const res = await fetch('./kota.json');
    const data = await res.json();
    Object.keys(data).forEach((key, val) => {
        id_provinsi = data[key]['kode']['id_provinsi'].toString();
        if (data[key]['kode']['id_kota'] < 10) {
            id_kota = id_provinsi + '0' + data[key]['kode']['id_kota'].toString();
        } else {
            id_kota = id_provinsi + data[key]['kode']['id_kota'].toString();
        }
        city = {
            'id_provinsi': id_provinsi,
            'id_kota': id_kota,
            'nama_kota': data[key]['kota']
        }
        cities.push(city);
    })
    console.log(cities)
}

const makeDistrict = async () => {
    const districts = [];
    let district = {};
    let id_kota = '';
    let id_provinsi = '';
    let id_kecamatan = '';
    const res = await fetch('./kecamatan.json');
    const data = await res.json();
    Object.keys(data).forEach((key, val) => {
        id_provinsi = data[key]['kode']['id_provinsi'].toString();
        id_kota = data[key]['kode']['id_kota'].toString();

        if (data[key]['kode']['id_kota'] < 10) {
            id_kota = id_provinsi + '0' + data[key]['kode']['id_kota'].toString();
        } else {
            id_kota = id_provinsi + data[key]['kode']['id_kota'].toString();
        }

        if (data[key]['kode']['id_kecamatan'] < 10) {
            id_kecamatan = id_kota + '0' + data[key]['kode']['id_kecamatan'].toString();
        } else {
            id_kecamatan = id_kota + data[key]['kode']['id_kecamatan'].toString();
        }
        district = {
            'id_kecamatan': id_kecamatan,
            'id_kota': id_kota,
            'nama_kecamatan': data[key]['kecamatan']
        }
        districts.push(district);
    })
    console.log(districts)
}

const makeSubDistrict = async () => {
    const subDistricts = [];
    let subDistrict = {};
    let id_kota = '';
    let id_provinsi = '';
    let id_kecamatan = '';
    let id_kelurahan = '';
    const res = await fetch('./kelurahan.json');
    const data = await res.json();
    Object.keys(data).forEach((key, val) => {
        id_provinsi = data[key]['kode']['id_provinsi'].toString();
        id_kota = data[key]['kode']['id_kota'].toString();
        id_kelurahan = data[key]['kode']['id_kelurahan'].toString();

        if (data[key]['kode']['id_kota'] < 10) {
            id_kota = id_provinsi + '0' + data[key]['kode']['id_kota'].toString();
        } else {
            id_kota = id_provinsi + data[key]['kode']['id_kota'].toString();
        }

        if (data[key]['kode']['id_kecamatan'] < 10) {
            id_kecamatan = id_kota + '0' + data[key]['kode']['id_kecamatan'].toString();
        } else {
            id_kecamatan = id_kota + data[key]['kode']['id_kecamatan'].toString();
        }

        if (data[key]['kode']['id_kelurahan'] < 10) {
            id_kelurahan = id_kecamatan + '0' + data[key]['kode']['id_kelurahan'].toString();
        } else {
            id_kelurahan = id_kecamatan + data[key]['kode']['id_kelurahan'].toString();
        }

        subDistrict = {
            'id_kelurahan': id_kelurahan,
            'id_kecamatan': id_kecamatan,
            'nama_kelurahan': data[key]['kelurahan']
        }
        subDistricts.push(subDistrict);
    })
    console.log(subDistricts)
}

const makeTPS = async () => {
    const TPS_arr = [];
    let TPS = {};
    let id_kota = '';
    let id_provinsi = '';
    let id_kecamatan = '';
    let id_kelurahan = '';
    let id_TPS = '';
    let no_TPS = '';
    const res = await fetch('./kelurahan.json');
    const data = await res.json();
    Object.keys(data).forEach((key, val) => {
        id_provinsi = data[key]['kode']['id_provinsi'].toString();
        id_kota = data[key]['kode']['id_kota'].toString();
        id_kelurahan = data[key]['kode']['id_kelurahan'].toString();

        if (data[key]['kode']['id_kota'] < 10) {
            id_kota = id_provinsi + '0' + data[key]['kode']['id_kota'].toString();
        } else {
            id_kota = id_provinsi + data[key]['kode']['id_kota'].toString();
        }

        if (data[key]['kode']['id_kecamatan'] < 10) {
            id_kecamatan = id_kota + '0' + data[key]['kode']['id_kecamatan'].toString();
        } else {
            id_kecamatan = id_kota + data[key]['kode']['id_kecamatan'].toString();
        }

        if (data[key]['kode']['id_kelurahan'] < 10) {
            id_kelurahan = id_kecamatan + '0' + data[key]['kode']['id_kelurahan'].toString();
        } else {
            id_kelurahan = id_kecamatan + data[key]['kode']['id_kelurahan'].toString();
        }

        for (let i = 1; i <= 10; i++) {
            if (i == 10) {
                no_TPS = '10';
            } else {
                no_TPS = '0' + i.toString();
            }
            TPS = {
                'id_TPS': id_kelurahan + no_TPS,
                'id_kelurahan': id_kelurahan,
                'no_TPS': no_TPS
            }
            TPS_arr.push(TPS);
        }
    })
    console.log(TPS_arr)

    // const blob = new Blob([JSON.stringify(TPS_arr)], { type: "text/json" });
    // const link = document.createElement("a");

    // link.download = 'tps';
    // link.href = window.URL.createObjectURL(blob);
    // link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    // const evt = new MouseEvent("click", {
    //     view: window,
    //     bubbles: true,
    //     cancelable: true,
    // });

    // link.dispatchEvent(evt);
    // link.remove()
}