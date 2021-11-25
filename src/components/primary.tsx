// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button as AntButton } from 'antd';
import { ButtonHTMLType } from 'antd/lib/button/button';
import { FC } from 'react';
import styled from 'styled-components';

export const Separator = styled.div<{
  height?: number;
  width?: number;
  color?: string;
  mr?: number;
}>`
  height: ${({ height }) => height ?? 1}px;
  width: ${({ width }) => width ?? 1}px;
  background-color: ${({ color }) => color ?? 'lightgray'};
  margin-right: ${({ mr }) => mr ?? 0}px;
`;

export const Text = styled.div<{
  size?: number;
  fw?: string;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  mw?: number;
  clolor?: string;
}>`
  // TODO: support diff font-family props
  color: ${({ color }) => color ?? '#191d27'};
  font-size: ${({ size }) => size ?? 18}px;
  font-weight: ${({ fw }) => fw ?? 400};
  margin-left: ${({ ml }) => ml ?? 0}px;
  margin-right: ${({ mr }) => mr ?? 0}px;
  margin-top: ${({ mt }) => mt ?? 0}px;
  margin-bottom: ${({ mb }) => mb ?? 0}px;
  min-width: ${({ mw }) => mw ?? 10}px;
  overflow-wrap: break-word;
`;

const StyledButton = styled(AntButton)<{
  width?: number;
  align?: string;
  margin?: number;
  color?: string;
}>`
  background-color: ${({ color }) => color ?? '#4388dd'};
  align-self: ${({ align }) => align ?? 'center'}px;
  width: ${({ width }) => width ?? 150}px;
  margin: ${({ margin }) => margin ?? 0}px;
`;

type ButtonProps = {
  title: string;
  onClick: () => void;
  htmlType?: ButtonHTMLType;
  loading?: boolean;
  color?: string;
  width?: number;
  margin?: number;
};

export const Button: FC<ButtonProps> = ({
  title,
  onClick,
  loading,
  htmlType,
  color,
  width,
  margin,
}) => (
  <StyledButton
    loading={!!loading}
    align="center"
    width={width}
    type="primary"
    shape="round"
    size="large"
    color={color}
    margin={margin}
    onClick={onClick}
    htmlType={htmlType ?? 'button'}
  >
    {title}
  </StyledButton>
);
