import styled, { css } from "styled-components";
import { Bold, Italic, Underline } from "@styled-icons/feather";

export const Toolbar = styled.div`
  position: sticky;
  padding: 4px 0px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`;

const sharedStyle = css`
  width: 23px;
  height: 23px;
  stroke-width: 2;
`;

export const BoldIcon = styled(Bold)`
  ${sharedStyle}
`;

export const ItalicIcon = styled(Italic)`
  ${sharedStyle}
`;

export const UnderlineIcon = styled(Underline)`
  ${sharedStyle}
`;
