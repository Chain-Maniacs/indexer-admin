// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { Progress } from 'antd';

const Container = styled.div`
  display: flex;
  min-width: 350px;
  height: 40px;
`;

const ProgressBar = styled(Progress)`
  min-width: 300;
  margin-right: 20px;
`;

const ProgressInfoView = () => {
  const strokeColor = { '0%': '#4388dd', '100%': '#ff4581' };
  return (
    <Container>
      <ProgressBar percent={70} strokeColor={strokeColor} />
    </Container>
  );
};

export default ProgressInfoView;
