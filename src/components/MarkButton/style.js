import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  color: ${({ active, theme }) => (active ? theme.active : theme.default)};
  font-size: 21px;
  padding: 0;
  border: none;
  background: none;
  letter-spacing: 1.3px;
  text-transform: uppercase;

  &:focus {
    border-style: outset;
    border: none;
    outline: none;
  }
`;
