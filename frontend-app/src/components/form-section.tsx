'use client'

import styled from "styled-components";
import {StrapiAdapterConfig, uploadLead} from "@/adapter/service/strapi-adapter";
import {ChangeEvent, useState} from "react";

const FormWrapper = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #ddd;
`;
const InputField = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #444;
    }
`;
type Props = {
  strapiConfig: StrapiAdapterConfig
}
export const FormSection: React.FC<Props> = ({strapiConfig}) => {
  const [email, setEmail] = useState('')

  const onSubmit = async () => {
    try {
      await uploadLead(email, strapiConfig)
    }catch(e){
      console.error(e)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (<FormWrapper onSubmit={onSubmit}>
    <InputField
      type="email" placeholder="Email"
      value={email}
      onChange={handleChange}
      required/>
    <SubmitButton type="submit">Submit</SubmitButton>
  </FormWrapper>)
}