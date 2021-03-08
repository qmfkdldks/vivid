import styled, { css } from "styled-components";
import { Mouse } from "@styled-icons/boxicons-regular/Mouse";
import { Eye } from "@styled-icons/entypo/Eye";
import {
  Repeat,
  FormatBold as Bold,
  FormatItalic as Italic,
  FormatUnderlined as Underline,
} from "@styled-icons/material-rounded";

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

export const MouseIcon = styled(Mouse)`
  ${sharedStyle}
`;

export const EyeIcon = styled(Eye)`
  ${sharedStyle}
`;

export const RepeatIcon = styled(Repeat)`
  ${sharedStyle}
`;

export const Button = styled.button`
  cursor: pointer;
  color: ${({ active, theme }) => (active ? theme.active : theme.default)};
  font-size: 21px;
  padding: 0;
  border: none;
  background: none;

  &:focus {
    border-style: outset;
    border: none;
    outline: none;
  }
`;
