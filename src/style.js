import styled from "styled-components";
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

export const AnimationSingleButton = styled.a`
  cursor: pointer;
  color:  "green";
`;

export const Icon = styled.span`
  font-size: 16px;
  vertical-align: middle;
  color: black;
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
 
export const ToolbarBottom = styled.div`
    position: relative;
    padding: 1px 18px 17px;
    margin: 0;
    border-bottom: 2px solid #eee;
    margin-bottom: 0px;
    width: auto;
    height: auto;
 
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 10px;
  };
 
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
