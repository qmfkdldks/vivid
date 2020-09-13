import styled from "styled-components";
import { Zap } from "@styled-icons/octicons";
import { Bold, Italic, Underline } from "@styled-icons/feather";

export const Button = styled.button`
  cursor: pointer;
  color: ${({ reversed, active }) =>
    reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"};
  font-size: vw;
  padding: 0;
  border: none;
  background: none;
`;

export const Icon = styled.span`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Toolbar = styled.div`
  position: sticky;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;

  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`;

export const BoldIcon = styled(Bold)`
  color: black;
  width: 16px;
  height: 16px;
`;

export const ItalicIcon = styled(Italic)`
  color: black;
  width: 16px;
  height: 16px;
`;

export const UnderlineIcon = styled(Underline)`
  color: black;
  width: 16px;
  height: 16px;
`;
