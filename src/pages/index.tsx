import React from 'react';
import styled from 'styled-components';

import Layout from '../layout/index';
import Header from '../components/Header';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ({ location }: any) => {
  return (
    <Layout location={location}>
      <Wrapper>
        <Header />
      </Wrapper>
    </Layout>
  );
};
