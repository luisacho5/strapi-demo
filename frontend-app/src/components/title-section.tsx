'use client'
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 36px;
  color: #000000;
  text-align: center;
  padding: 30px;
  font-weight:400;
;
`;
type Props = {
  title:string
}
export const TitleSection: React.FC<Props> = ({ title }) => {
  return (<Title>{title}</Title>)
}