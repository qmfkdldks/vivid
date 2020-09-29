import styled from "styled-components";

export const Button = styled.a`
  cursor: pointer;
  color: ${({ reversed, active }) =>
    reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"};
`;

export const AnimationSingleButton = styled.a`
  cursor: pointer;
  color:  "green";
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
  }
`;
