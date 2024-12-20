'use client'

import styled from "styled-components";
import {StrapiAdapterConfig, uploadLead} from "@/adapter/service/strapi-adapter";
import {ChangeEvent, useState} from "react";

const FormWrapper = styled.form`
    display: flex;
    align-items: center;
    gap: 32px; 
    padding: 16px;
    margin: 0 auto;
    border-radius: 4px;
    width: 100%;
    background-color:#F7F7F7;
`;
const InputField = styled.input`
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    color: #000;
    background: transparent;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border-bottom: 2px solid #007bff;
    }
`;

const SubmitButton = styled.button`
    padding: 12px 24px;
    background-color: #000;
    color: #fff;
    border: none;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
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

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await uploadLead(email, strapiConfig)
      setEmail('')
      console.log('EMAIL SENT TO STRAPI: ',email)
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