import * as React from 'react';
import styled from 'styled-components';

import Layout from '../layout/index';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(0, 53, 128);
`;

export default ({ location }: any) => {
  return (
    <Layout location={location}>
      <Wrapper>Not Found</Wrapper>
    </Layout>
  );
};

// export const NotFoundQuery = graphql`
//   query NotFoundPageQuery {
//     image: file(relativePath: { eq: "icon.png" }) {
//       ...fluidImage
//     }
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//   }
// `;
