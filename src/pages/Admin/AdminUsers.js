/* eslint-disable no-unused-vars */
import { Table, Popover, Whisper, Checkbox, Dropdown, IconButton, Progress } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
// import { mockUsers } from './mock';
import { useState } from 'react';
import AdminLayout from '../../components/Layouts/AdminLayout';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {rowData.name}
      </p>
      <p>
        <b>Gender:</b> {rowData.gender}
      </p>
      <p>
        <b>City:</b> {rowData.city}
      </p>
      <p>
        <b>Street:</b> {rowData.street}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{rowData[dataKey]}</a>
      </Whisper>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}>
      <img src={rowData.avatar} width="40" />
    </div>
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = (eventKey) => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>Follow</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Sponsor</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Add to friends</Dropdown.Item>
        <Dropdown.Item eventKey={4}>View Profile</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Block</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};

const AdminUsers = () => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  return (
    <AdminLayout title="Users">
      <HeaderLayout title="Users" />
      <div className="container mx-auto">
        <Table height={650} className=" max-w-4xl mx-auto" data={data} id="table">
          <Column width={50} align="center">
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </HeaderCell>
            <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
          <Column width={80} align="center">
            <HeaderCell>Avartar</HeaderCell>
            <ImageCell dataKey="avartar" />
          </Column>

          <Column width={160}>
            <HeaderCell>Name</HeaderCell>
            <NameCell dataKey="name" />
          </Column>

          <Column width={230}>
            <HeaderCell>Skill Proficiency</HeaderCell>
            <Cell style={{ padding: '10px 0' }}>
              {(rowData) => <Progress percent={rowData.progress} showInfo={false} />}
            </Cell>
          </Column>

          <Column width={100}>
            <HeaderCell>Rating</HeaderCell>
            <Cell>
              {(rowData) =>
                Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
              }
            </Cell>
          </Column>

          <Column width={100}>
            <HeaderCell>Income</HeaderCell>
            <Cell>{(rowData) => `$${rowData.amount}`}</Cell>
          </Column>

          <Column width={120}>
            <HeaderCell>
              <MoreIcon />
            </HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
      </div>
    </AdminLayout>
  );
};

import { faker } from '@faker-js/faker/locale/en';
import HeaderLayout from '../../components/Layouts/HeaderLayout';
function mockUsers(length) {
  const createRowData = (rowIndex) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const gender = faker.name.gender(true);
    const name = faker.name.findName(firstName, lastName, gender);
    const avatar = faker.image.avatar();

    const city = faker.address.city();
    const street = faker.address.street();
    const email = faker.internet.email();
    const postcode = faker.address.zipCode();
    const phone = faker.phone.number();
    const amount = faker.finance.amount(1000, 90000);

    const age = Math.floor(Math.random() * 30) + 18;
    const stars = Math.floor(Math.random() * 10000);
    const followers = Math.floor(Math.random() * 10000);
    const rating = 2 + Math.floor(Math.random() * 3);
    const progress = Math.floor(Math.random() * 100);

    return {
      id: rowIndex + 1,
      name,
      firstName,
      lastName,
      avatar,
      city,
      street,
      postcode,
      email,
      phone,
      gender,
      age,
      stars,
      followers,
      rating,
      progress,
      amount
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockTreeData(options) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    const length = limits[layer];
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      let row = {
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}

export default AdminUsers;
