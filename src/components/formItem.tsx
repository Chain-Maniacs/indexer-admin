// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState, VFC } from 'react';
import { Field, FormikErrors, FormikHandlers, FormikValues } from 'formik';
import styled from 'styled-components';

import { Label, Text } from './primary';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormField = styled(Field)`
  border-radius: 5px;
  border: thin solid lightgray;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 16px;
`;

const Option = styled.option`
  padding: 10px 10px;
  background-color: green;
`;

type Props = {
  title: string;
  fieldKey: string;
  placeholder?: string;
  value?: string | number;
  options?: string[];
  onChange?: FormikHandlers['handleChange'];
  errors?: FormikErrors<FormikValues>;
};

export const FieldItem: VFC<Props> = ({ title, value, placeholder, fieldKey, options, errors }) => {
  const [changedValue, setValue] = useState(value);
  const onFormChange = (event: any) => {
    console.log('event:', event.target.value);
    setValue(event.target.value);
  };
  return (
    <Container>
      <Label htmlFor={fieldKey}>{title}</Label>
      {!options && <FormField placeholder={placeholder} name={fieldKey} />}
      {!!options && (
        <FormField
          as="select"
          key={title}
          name={fieldKey}
          placeholder={placeholder}
          onChange={onFormChange}
          value={changedValue}
        >
          {options.map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </FormField>
      )}
      {!!errors?.[fieldKey] && (
        <Text mt={5} color="red" size={15}>
          {errors[fieldKey]}
        </Text>
      )}
    </Container>
  );
};
