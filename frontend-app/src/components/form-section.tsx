'use client'

import styled from "styled-components";

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


export const FormSection: React.FC = ({}) => {
  return (<FormWrapper>
    <InputField type="email" placeholder="Email"/>
    <SubmitButton type="submit">Submit</SubmitButton>
  </FormWrapper>)
}