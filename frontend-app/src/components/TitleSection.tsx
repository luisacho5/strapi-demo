'use client'
import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  color: #000000;
;
`;
type Props = {
  title:string
}
export const TitleSection: React.FC<Props> = ({ title }) => {
  return (<Title>{title}</Title>)
}