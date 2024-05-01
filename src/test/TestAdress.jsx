import axios from "axios";
import React, { useEffect, useRef } from "react";
import Select from "react-select";

const TestAdress = () => {
  const [options, setOptions] = React.useState({provinces: [], districts: [], wards: []});
  const [selected, setSelected] = React.useState({province: null, district: null, ward: null});
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    axios.get(`http://localhost:8080/get-api/get-all-provinces`).then((res) => {
      setOptions(prevOptions => ({...prevOptions, provinces: res.data.map((province) => ({ value: province.code, label: province.fullName }))}));
    });

    if (selectedRef.current?.province) {
      axios.get(`http://localhost:8080/get-api/get-districts-by-provinces-code/${selectedRef.current.province.value}`).then((res) => {
        setOptions(prevOptions => ({...prevOptions, districts: res.data.map((district) => ({ value: district.code, label: district.name }))}));
      });
    }

    if (selectedRef.current?.district) {
      axios.get(`http://localhost:8080/get-api/get-wards-by-district-code/${selectedRef.current.district.value}`).then((res) => {
        setOptions(prevOptions => ({...prevOptions, wards: res.data.map((ward) => ({ value: ward.code, label: ward.name }))}));
      });
    }
  }, [selected.province, selected.district]);

  const addAddress = async () => {
    // Thay đổi giá trị này theo yêu cầu
    const addressRequest = {
      customerId: 1,
      provinceCode: selected.province?.value,
      districtCode: selected.district?.value,
      wardCode: selected.ward?.value,
      fullName: 'Nguyen Van A',
      phoneNumBer: '0123456789',
      isDefault: true
    };

    console.log(addressRequest);
    // try {
    //   const response = await axios.post('http://localhost:8080/add-address', addressRequest);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      <div className="mb-2">
        <label htmlFor="provinces">Thành phố:</label>
        <Select id="provinces" className="form-control" value={selected.province} onChange={value => setSelected(prevSelected => ({...prevSelected, province: value, district: null, ward: null}))} options={options.provinces} />
      </div>
      <div className="mb-2">
        <label htmlFor="provinces">Quận:</label>
        <Select id="provinces" className="form-control" value={selected.district} onChange={value => setSelected(prevSelected => ({...prevSelected, district: value, ward: null}))} options={options.districts} />
      </div>
      <div className="mb-2">
        <label htmlFor="provinces">Phường:</label>
        <Select id="provinces" className="form-control" value={selected.ward} onChange={value => setSelected(prevSelected => ({...prevSelected, ward: value}))} options={options.wards} />
      </div>
      <div>
        <button className="btn btn-primary" onClick={addAddress}>thêm địa chỉ</button>
      </div>
    </div>
  );
};

export default TestAdress;
