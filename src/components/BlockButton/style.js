import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  color: ${({ active }) => (active ? "#011627" : "#b7b7a4")};
  font-size: 21px;
  padding: 0;
  border: none;
  background: none;
  letter-spacing: 1.3px;

  &:focus {
    border-style: outset;
    border: none;
  }
`;
