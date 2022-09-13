import { Input, Popconfirm, Table } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'

const TableForm = ({ data, setData }) => {
    const sumAge = data.reduce((acc, curr) => {
        return parseInt(acc) + (parseInt(curr.age) || 0)
    }, 0)

    const handleLocal = (localNew) => {
        localStorage.setItem('users', JSON.stringify(localNew))
    }
    const handleDelete = (key) => {
        const filterd = data.filter((item) => item.key !== key);
        setData(filterd);
        localStorage.setItem('users', JSON.stringify(filterd))
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (_, record) => (
                <Input
                    min={0}
                    onChange={e => {
                        const _data = [...data]
                        const value = e.target.value
                        const index = _data.findIndex(item => item.key === record.key)
                        _data[index].age = value
                        setData(_data)
                        handleLocal(_data)
                    }}
                    value={record.age} />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',

        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a style={{
                            color: 'red',
                            fontWeight: "bold",
                        }}>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <>
            <Table dataSource={data} columns={columns} footer={() => <span style={{
                color: 'red',
                fontWeight: 'bolder'
            }}>{`Total Age : ${sumAge}`}</span>} />;
        </>
    );
};

export default TableForm;