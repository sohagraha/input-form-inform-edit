import { Button, Form, Input, InputNumber } from 'antd';
import React, { useState } from 'react';
import TableForm from './TableForm';

const InputForm = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(JSON.parse(localStorage.getItem('users')) || [])

    const onFinish = (values) => {
        if (data.length === 0) {
            values.key = 1;
            values.age = parseInt(values.age)
            setData([...data, values])
            data.push(values);
            localStorage.setItem('users', JSON.stringify(data));

        }
        else {
            values.key = Math.max.apply(Math, data.map((item) => item.key)) + 1;
            values.age = parseInt(values.age)
            setData([...data, values])
            let localData = JSON.parse(localStorage.getItem('users')) || [];
            localData.push(values);
            localStorage.setItem('users', JSON.stringify(localData));
        }
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Form form={form}
                style={{ width: '50%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    type="number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Valid Age!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button style={{
                        marginTop: '38px'
                    }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <TableForm data={data} setData={setData} />
        </>
    );
};

export default InputForm;