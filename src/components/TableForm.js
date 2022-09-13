import { Input, Space, Table } from 'antd';
import React from 'react';

const TableForm = ({ data, setData }) => {
    const sumAge = data.reduce((acc, curr) => {
        return parseInt(acc) + parseInt(curr.age)
    }, 0)

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
                    onChange={e => {
                        const _data = [...data]
                        const value = e.target.value
                        const index = _data.findIndex(item => item.key === record.key)
                        _data[index].age = value
                        setData(_data)
                        console.log(data);
                    }}
                    value={record.age} />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',

        },
    ];

    return (
        <>
            <Table dataSource={data} columns={columns} footer={() => `Total Age : ${sumAge}`} />;
        </>
    );
};

export default TableForm;