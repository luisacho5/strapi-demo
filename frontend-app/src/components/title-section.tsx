'use client'
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  color: #000000;
  text-align: center;
  padding: 20px 0;
;
`;
type Props = {
  title:string
}
export const TitleSection: React.FC<Props> = ({ title }) => {
  return (<Title>{title}</Title>)
}